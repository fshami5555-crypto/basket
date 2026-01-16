
import React, { useState, useEffect } from 'react';
import { AppState, Category, Product, CartItem, Order } from './types';
import { loadData, saveData } from './store';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import AdBanner from './components/AdBanner';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import SpecialOffersPage from './components/SpecialOffersPage';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<{ type: 'home' | 'admin' | 'category' | 'product' | 'offers', data?: any }>({ type: 'home' });
  const [isLoading, setIsLoading] = useState(true);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await loadData();
      setState(data);
      setIsLoading(false);
    };
    init();

    // Load local cart
    const localCart = localStorage.getItem('basket_cart');
    if (localCart) {
      setCartItems(JSON.parse(localCart));
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

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setShowLogin(false);
      setCurrentView({ type: 'admin' });
    }
  };

  const updateState = (newPartialState: Partial<AppState>) => {
    setState(prev => prev ? ({ ...prev, ...newPartialState }) : null);
  };

  const navigateToCategory = (category: Category) => {
    setCurrentView({ type: 'category', data: category });
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: Product) => {
    setCurrentView({ type: 'product', data: product });
    window.scrollTo(0, 0);
  };

  const navigateToOffers = () => {
    setCurrentView({ type: 'offers' });
    window.scrollTo(0, 0);
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

    // Save to Admin State
    if (state) {
      updateState({ orders: [newOrder, ...state.orders] });
    }

    // Prepare WhatsApp Message
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
    
    // Clear cart and close
    setCartItems([]);
    setIsCartOpen(false);
    
    // Redirect to WhatsApp
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

  if (currentView.type === 'admin') {
    return (
      <AdminDashboard 
        state={state} 
        updateState={updateState} 
        onLogout={() => { setIsAdmin(false); setCurrentView({ type: 'home' }); }} 
      />
    );
  }

  const categories = state.categories || [];
  const products = state.products || [];
  const ads = state.ads || [];
  const specialOffers = state.specialOffers || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onAdminClick={() => isAdmin ? setCurrentView({ type: 'admin' }) : setShowLogin(true)} 
        isAdmin={isAdmin}
        categories={categories}
        onCategoryClick={navigateToCategory}
        onHomeClick={() => setCurrentView({ type: 'home' })}
        onOffersClick={navigateToOffers}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        cartTotal={cartItems.reduce((acc, i) => acc + (i.product.discountPrice || i.product.price) * i.quantity, 0)}
      />
      
      <main className="flex-grow">
        {currentView.type === 'home' ? (
          <>
            <Hero slides={state.heroSlides || []} onShopNow={navigateToOffers} />
            
            <div className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  المتجر الأول بالأردن المرخص والمعتمد لدى الوكالات الكهربائية لتستقبلك بأفرع رسمية للتأكد من جودة المنتج وتجربته
                </h1>
              </div>

              <CategoryGrid 
                categories={categories} 
                onCategoryClick={navigateToCategory} 
              />
              
              {categories.map((cat, index) => {
                const catProducts = products.filter(p => p.category === cat.name).slice(0, 4);
                const ad = ads.length > 0 ? ads[index % ads.length] : null;
                
                return (
                  <React.Fragment key={cat.id}>
                    <ProductSection 
                      title={cat.name} 
                      products={catProducts} 
                      onSeeAll={() => navigateToCategory(cat)}
                      onProductClick={navigateToProduct}
                      onAddToCart={addToCart}
                    />
                    {catProducts.length > 0 && ad && <AdBanner image={ad.image} />}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : currentView.type === 'category' ? (
          <CategoryPage 
            category={currentView.data} 
            products={products.filter(p => p.category === currentView.data.name)}
            onBack={() => setCurrentView({ type: 'home' })}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        ) : currentView.type === 'offers' ? (
          <SpecialOffersPage 
            products={products}
            specialOffers={specialOffers}
            onBack={() => setCurrentView({ type: 'home' })}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        ) : (
          <ProductDetail 
            product={currentView.data} 
            onBack={() => setCurrentView({ type: 'home' })}
            onAddToCart={addToCart}
          />
        )}
      </main>

      <Footer />

      {/* Cart Drawer */}
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
