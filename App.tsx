
import React, { useState, useEffect } from 'react';
import { AppState, Category, Product } from './types';
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

const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<{ type: 'home' | 'admin' | 'category' | 'product' | 'offers', data?: any }>({ type: 'home' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await loadData();
      setState(data);
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (state && !isLoading) {
      saveData(state);
    }
  }, [state, isLoading]);

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
      />
      
      <main className="flex-grow">
        {currentView.type === 'home' ? (
          <>
            <Hero slides={state.heroSlides || []} />
            
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
          />
        ) : currentView.type === 'offers' ? (
          <SpecialOffersPage 
            products={products}
            specialOffers={specialOffers}
            onBack={() => setCurrentView({ type: 'home' })}
            onProductClick={navigateToProduct}
          />
        ) : (
          <ProductDetail 
            product={currentView.data} 
            onBack={() => setCurrentView({ type: 'home' })}
          />
        )}
      </main>

      <Footer />

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
