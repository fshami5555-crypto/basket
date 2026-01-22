
import React, { useState } from 'react';
import { AppState, Product, Category, HeroSlide, Order, Ad, SpecialOffer, HelpSection, Brand } from '../types';
import { Package, Grid, LayoutPanelLeft, ShoppingBag, LogOut, Plus, Trash2, Megaphone, Image as ImageIcon, ChevronDown, ChevronUp, Zap, Clock, Info, Award } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface AdminDashboardProps {
  state: AppState;
  updateState: (partial: Partial<AppState>) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, updateState, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'categories' | 'products' | 'hero' | 'ads' | 'offers' | 'help' | 'brands'>('orders');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const products = state.products || [];
  const categories = state.categories || [];
  const brands = state.brands || [];
  const heroSlides = state.heroSlides || [];
  const ads = state.ads || [];
  const orders = state.orders || [];
  const specialOffers = state.specialOffers || [];
  const helpSections = state.helpSections || [];

  const tabs = [
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'categories', label: 'الأقسام', icon: Grid },
    { id: 'brands', label: 'الماركات', icon: Award },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'hero', label: 'السلايدر', icon: LayoutPanelLeft },
    { id: 'ads', label: 'الإعلانات', icon: Megaphone },
    { id: 'offers', label: 'العروض', icon: Zap },
    { id: 'help', label: 'المساعدة', icon: Info },
  ] as const;

  // Brands Management
  const addBrand = () => {
    const newBrand: Brand = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'ماركة جديدة',
      logo: 'https://via.placeholder.com/150x50?text=Logo',
      image: 'https://picsum.photos/seed/brand/800/600'
    };
    updateState({ brands: [...brands, newBrand] });
  };

  const deleteBrand = (id: string) => {
    updateState({ brands: brands.filter(b => b.id !== id) });
  };

  const updateBrand = (id: string, partial: Partial<Brand>) => {
    const newBrands = brands.map(b => b.id === id ? { ...b, ...partial } : b);
    updateState({ brands: newBrands });
  };

  // Products
  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'منتج جديد',
      price: 0,
      category: categories[0]?.name || 'غير مصنف',
      image: 'https://picsum.photos/400/400',
      description: 'وصف مختصر للمنتج...',
      longDescription: '',
      images: [],
      discountPrice: 0
    };
    updateState({ products: [newProduct, ...products] });
    setEditingProductId(newProduct.id);
  };

  const deleteProduct = (id: string) => {
    updateState({ products: products.filter(p => p.id !== id) });
  };

  // Categories
  const addCategory = () => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'قسم جديد',
      image: 'https://picsum.photos/200/200'
    };
    updateState({ categories: [...categories, newCat] });
  };

  const deleteCategory = (id: string) => {
    updateState({ categories: categories.filter(c => c.id !== id) });
  };

  // Hero
  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: Math.random().toString(36).substr(2, 9),
      image: 'https://picsum.photos/1600/600',
      title: 'عنوان السلايد الجديد',
      subtitle: 'نص إضافي هنا',
      buttonText: 'تسوق الآن'
    };
    updateState({ heroSlides: [...heroSlides, newSlide] });
  };

  // Ads
  const addAd = () => {
    const newAd: Ad = {
      id: Math.random().toString(36).substr(2, 9),
      image: 'https://springgreen-leopard-502388.hostingersite.com/wp-content/uploads/2024/08/toys_slider_desk_ar-1920x290-1.jpg'
    };
    updateState({ ads: [...ads, newAd] });
  };

  const deleteAd = (id: string) => {
    updateState({ ads: ads.filter(a => a.id !== id) });
  };

  // Special Offers
  const addOffer = () => {
    if (products.length === 0) return;
    const newOffer: SpecialOffer = {
      id: Math.random().toString(36).substr(2, 9),
      productId: products[0].id,
      endTime: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      offerPrice: products[0].price * 0.8
    };
    updateState({ specialOffers: [...specialOffers, newOffer] });
  };

  const deleteOffer = (id: string) => {
    updateState({ specialOffers: specialOffers.filter(o => o.id !== id) });
  };

  // Help Sections Update
  const updateHelpSection = (id: string, partial: Partial<HelpSection>) => {
    const newSections = helpSections.map(s => s.id === id ? { ...s, ...partial } : s);
    updateState({ helpSections: newSections });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 font-sans overflow-hidden" dir="rtl">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-l border-gray-200 flex-col shrink-0">
        <div className="p-8 flex items-center gap-3 border-b">
          <img src={LOGO_URL} alt="Logo" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="font-black text-primary text-xl tracking-tight leading-none">الإدارة</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Control Panel</span>
          </div>
        </div>

        <nav className="flex-grow py-6 overflow-y-auto px-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span>العودة للمتجر</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Navbar (Sticky on mobile, Header on desktop) */}
        <header className="bg-white border-b border-gray-100 flex-shrink-0 z-20">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 lg:hidden">
               <img src={LOGO_URL} alt="Logo" className="h-8 w-auto" />
               <span className="font-black text-primary">لوحة الإدارة</span>
            </div>
            <h2 className="hidden lg:block text-2xl font-black text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <div className="flex items-center gap-4">
               <button onClick={onLogout} className="lg:hidden p-2 text-red-500 bg-red-50 rounded-xl"><LogOut size={20}/></button>
               <div className="hidden sm:flex flex-col text-left mr-2 items-end">
                  <span className="text-sm font-black text-gray-800">مدير النظام</span>
                  <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">متصل الآن</span>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white font-black shadow-lg shadow-accent/20">A</div>
            </div>
          </div>

          {/* Mobile Tabs Menu (Horizontal Scroll) */}
          <div className="lg:hidden border-t overflow-x-auto scrollbar-hide bg-white">
            <div className="flex items-center px-4 py-3 gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl flex-shrink-0 transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                >
                  <tab.icon size={18} />
                  <span className="text-[10px] font-black">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between bg-white">
                  <h3 className="font-black text-gray-800 flex items-center gap-2"><ShoppingBag size={20} className="text-accent" /> الطلبات الواردة</h3>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">إجمالي: {orders.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 border-b text-xs font-black text-gray-400 uppercase tracking-widest">رقم الطلب</th>
                        <th className="px-6 py-4 border-b text-xs font-black text-gray-400 uppercase tracking-widest">العميل</th>
                        <th className="px-6 py-4 border-b text-xs font-black text-gray-400 uppercase tracking-widest">المجموع</th>
                        <th className="px-6 py-4 border-b text-xs font-black text-gray-400 uppercase tracking-widest">الحالة</th>
                        <th className="px-6 py-4 border-b text-xs font-black text-gray-400 uppercase tracking-widest">التفاصيل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-5 text-sm font-black text-primary">#{order.id}</td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-800">{order.customerName}</span>
                              <span className="text-xs text-gray-400 font-mono">{order.phoneNumber}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm font-black text-accent">{order.total} د.أ</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                              {order.status === 'pending' ? 'بانتظار التأكيد' : 'تم التوصيل'}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                             <button className="text-xs font-bold text-blue-500 hover:underline">عرض المنتجات</button>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-20 text-center text-gray-400 font-bold">لا توجد طلبات حالياً</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="font-black text-2xl text-primary">المنتجات المعروضة</h3>
                <button onClick={addProduct} className="w-full sm:w-auto bg-accent text-white px-8 py-3 rounded-2xl flex items-center justify-center gap-3 font-black shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                  <Plus size={20} /> إضافة منتج جديد
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 bg-gray-50 rounded-2xl border flex-shrink-0 overflow-hidden">
                         <img src={p.image} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase tracking-widest">{p.category}</span>
                        <h4 className="font-black text-gray-800 text-lg mt-1">{p.name}</h4>
                        <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                          <span className="text-accent font-black">{p.price} د.أ</span>
                          {p.discountPrice && <span className="text-green-500 text-xs font-bold">خصم: {p.discountPrice} د.أ</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingProductId(editingProductId === p.id ? null : p.id)}
                          className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all ${editingProductId === p.id ? 'bg-primary text-white' : 'bg-blue-50 text-blue-500 hover:bg-blue-100'}`}
                        >
                          {editingProductId === p.id ? 'حفظ وإغلاق' : 'تعديل التفاصيل'}
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Editor Dropdown */}
                    {editingProductId === p.id && (
                      <div className="mt-6 pt-6 border-t grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide">
                         <div className="space-y-4">
                            <input className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-primary" value={p.name} placeholder="اسم المنتج" onChange={e => updateState({ products: products.map(pr => pr.id === p.id ? {...pr, name: e.target.value} : pr) })} />
                            <div className="grid grid-cols-2 gap-4">
                               <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none" value={p.price} placeholder="السعر" onChange={e => updateState({ products: products.map(pr => pr.id === p.id ? {...pr, price: Number(e.target.value)} : pr) })} />
                               <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none" value={p.discountPrice || 0} placeholder="سعر الخصم" onChange={e => updateState({ products: products.map(pr => pr.id === p.id ? {...pr, discountPrice: Number(e.target.value)} : pr) })} />
                            </div>
                         </div>
                         <div className="space-y-4">
                            <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none h-32" value={p.description} placeholder="وصف المنتج" onChange={e => updateState({ products: products.map(pr => pr.id === p.id ? {...pr, description: e.target.value} : pr) })} />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Simple logic for other tabs follows same structure, but prioritizing mobile visibility */}
          {activeTab === 'brands' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-2xl text-primary">إدارة الماركات</h3>
                <button onClick={addBrand} className="bg-primary text-white p-3 rounded-2xl shadow-lg"><Plus/></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map(brand => (
                  <div key={brand.id} className="bg-white p-6 rounded-3xl border relative group">
                     <button onClick={() => deleteBrand(brand.id)} className="absolute top-4 left-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18}/></button>
                     <img src={brand.logo} className="h-12 mx-auto mb-4 object-contain" />
                     <input className="w-full text-center font-black border-none bg-transparent" value={brand.name} onChange={e => updateBrand(brand.id, {name: e.target.value})} />
                     <input className="w-full text-[10px] text-blue-500 mt-2 text-center" value={brand.logo} onChange={e => updateBrand(brand.id, {logo: e.target.value})} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-2xl text-primary">تصنيفات المتجر</h3>
                  <button onClick={addCategory} className="bg-primary text-white px-6 py-2 rounded-2xl font-bold flex items-center gap-2">
                    <Plus size={18}/> إضافة قسم
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-white p-4 rounded-3xl border flex items-center gap-4 group">
                      <img src={cat.image} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <input className="w-full font-black border-none bg-transparent" value={cat.name} onChange={e => updateState({categories: categories.map(c => c.id === cat.id ? {...c, name: e.target.value} : c)})}/>
                        <input className="w-full text-[10px] text-gray-400 border-none bg-transparent truncate" value={cat.image} onChange={e => updateState({categories: categories.map(c => c.id === cat.id ? {...c, image: e.target.value} : c)})}/>
                      </div>
                      <button onClick={() => deleteCategory(cat.id)} className="text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="space-y-8 bg-white p-8 rounded-3xl border">
               {helpSections.map(section => (
                 <div key={section.id} className="border-b last:border-0 pb-8 space-y-4">
                    <label className="text-xs font-black text-gray-400 tracking-widest uppercase">{section.title}</label>
                    <textarea 
                      className="w-full p-6 bg-gray-50 rounded-2xl border-none min-h-[200px] outline-none font-bold text-gray-700 leading-relaxed" 
                      value={section.content}
                      onChange={e => updateHelpSection(section.id, {content: e.target.value})}
                    />
                 </div>
               ))}
            </div>
          )}

          {/* Simple indicators for non-implemented sections to maintain structure */}
          {['hero', 'ads', 'offers'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
               <ImageIcon size={64} className="mb-4 opacity-20" />
               <p className="font-bold italic">هذا القسم متاح للتعديل في لوحة التحكم الكاملة</p>
               <button onClick={() => setActiveTab('orders')} className="mt-4 text-primary underline font-bold">العودة للطلبات</button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
