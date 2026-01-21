
import React, { useState, useEffect } from 'react';
import { AppState, Category, Product, CartItem, Order, HelpSection } from './types';
import { loadData, saveData } from './store';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import BrandSection from './components/BrandSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import AdBanner from './components/AdBanner';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import SpecialOffersPage from './components/SpecialOffersPage';
import CartDrawer from './components/CartDrawer';
import HelpPage from './components/HelpPage';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync data with Firebase
  useEffect(() => {
    const init = async () => {
      const data = await loadData();
      setState(data);
      setIsLoading(false);
    };
    init();

    const localCart = localStorage.getItem('basket_cart');
    if (localCart) {
      try {
        setCartItems(JSON.parse(localCart));
      } catch (e) {
        console.error("Cart load error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (state && !isLoading) {
      saveData(state);
    }
  }, [state, isLoading]);

  useEffect(() => {
    localStorage.setItem('basket_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Navigation Function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setShowLogin(false);
      navigate('/admin');
    }
  };

  const updateState = (newPartialState: Partial<AppState>) => {
    setState(prev => prev ? ({ ...prev, ...newPartialState }) : null);
  };

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = (customerName: string, phoneNumber: string) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = cartItems.reduce((acc, item) => acc + (item.product.discountPrice || item.product.price) * item.quantity, 0);
    
    const newOrder: Order = {
      id: orderId,
      customerName,
      phoneNumber,
      total,
      status: 'pending',
      date: new Date().toLocaleDateString('ar-JO'),
      items: cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price
      }))
    };

    if (state) {
      updateState({ orders: [newOrder, ...state.orders] });
    }

    let message = `*طلب جديد من متجر Basket Shop*\n`;
    message += `*رقم الطلب:* ${orderId}\n`;
    message += `*الاسم:* ${customerName}\n`;
    message += `*رقم الهاتف:* ${phoneNumber}\n`;
    message += `--------------------------\n`;
    cartItems.forEach(item => {
      const price = item.product.discountPrice || item.product.price;
      message += `• ${item.product.name} (×${item.quantity}) - ${price * item.quantity} د.أ\n`;
    });
    message += `--------------------------\n`;
    message += `*الإجمالي:* ${total.toFixed(2)} د.أ\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/962790999512?text=${encodedMessage}`;
    
    setCartItems([]);
    setIsCartOpen(false);
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading || !state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-xl font-bold text-gray-700">جاري تحميل المتجر...</h2>
      </div>
    );
  }

  // --- Router Logic ---
  const renderContent = () => {
    const products = state.products || [];
    const categories = state.categories || [];
    const brands = state.brands || [];
    const ads = state.ads || [];
    const specialOffers = state.specialOffers || [];

    // Parse URL
    const pathParts = currentPath.split('/').filter(Boolean);

    // /admin
    if (currentPath === '/admin') {
      if (isAdmin) {
        return (
          <AdminDashboard 
            state={state} 
            updateState={updateState} 
            onLogout={() => { setIsAdmin(false); navigate('/'); }} 
          />
        );
      } else {
        setShowLogin(true);
        navigate('/'); // Fallback
      }
    }

    // /category/[id]
    if (pathParts[0] === 'category' && pathParts[1]) {
      const category = categories.find(c => c.id === pathParts[1]);
      if (category) {
        return (
          <CategoryPage 
            category={category} 
            products={products.filter(p => p.category === category.name)}
            onBack={() => navigate('/')}
            onProductClick={(p) => navigate(`/product/${p.id}`)}
            onAddToCart={addToCart}
          />
        );
      }
    }

    // /product/[id]
    if (pathParts[0] === 'product' && pathParts[1]) {
      const product = products.find(p => p.id === pathParts[1]);
      if (product) {
        return (
          <ProductDetail 
            product={product} 
            onBack={() => navigate('/')}
            onAddToCart={addToCart}
          />
        );
      }
    }

    // /offers
    if (currentPath === '/offers') {
      return (
        <SpecialOffersPage 
          products={products}
          specialOffers={specialOffers}
          onBack={() => navigate('/')}
          onProductClick={(p) => navigate(`/product/${p.id}`)}
          onAddToCart={addToCart}
        />
      );
    }

    // /help/[id]
    if (pathParts[0] === 'help' && pathParts[1]) {
      const section = state.helpSections.find(s => s.id === pathParts[1]);
      if (section) {
        return <HelpPage section={section} onBack={() => navigate('/')} />;
      }
    }

    // /contact
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // / (Home) - default
    return (
      <>
        <Hero slides={state.heroSlides || []} onShopNow={() => navigate('/offers')} />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              المتجر الأول بالأردن المرخص والمعتمد لدى الوكالات الكهربائية لتستقبلك بأفرع رسمية للتأكد من جودة المنتج وتجربته
            </h1>
          </div>

          <BrandSection brands={brands} />

          <CategoryGrid 
            categories={categories} 
            onCategoryClick={(cat) => navigate(`/category/${cat.id}`)} 
          />
          
          {categories.map((cat, index) => {
            const catProducts = products.filter(p => p.category === cat.name).slice(0, 4);
            const ad = ads.length > 0 ? ads[index % ads.length] : null;
            
            return (
              <React.Fragment key={cat.id}>
                <ProductSection 
                  title={cat.name} 
                  products={catProducts} 
                  onSeeAll={() => navigate(`/category/${cat.id}`)}
                  onProductClick={(p) => navigate(`/product/${p.id}`)}
                  onAddToCart={addToCart}
                />
                {catProducts.length > 0 && ad && <AdBanner image={ad.image} />}
              </React.Fragment>
            );
          })}
        </div>
      </>
    );
  };

  // If we are in admin mode, don't show the regular header/footer
  if (currentPath === '/admin' && isAdmin) {
    return (
      <AdminDashboard 
        state={state} 
        updateState={updateState} 
        onLogout={() => { setIsAdmin(false); navigate('/'); }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onAdminClick={() => isAdmin ? navigate('/admin') : setShowLogin(true)} 
        isAdmin={isAdmin}
        categories={state.categories || []}
        onCategoryClick={(cat) => navigate(`/category/${cat.id}`)}
        onHomeClick={() => navigate('/')}
        onOffersClick={() => navigate('/offers')}
        onContactClick={() => navigate('/contact')}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        cartTotal={cartItems.reduce((acc, i) => acc + (i.product.discountPrice || i.product.price) * i.quantity, 0)}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer 
        onHelpClick={(id) => navigate(`/help/${id}`)} 
        onContactClick={() => navigate('/contact')} 
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

export default App;
