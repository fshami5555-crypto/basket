
import React, { useState } from 'react';
import { AppState, Product, Category, HeroSlide, Order, Ad, SpecialOffer, HelpSection, Brand } from '../types';
import { Package, Grid, LayoutPanelLeft, ShoppingBag, LogOut, Plus, Trash2, Megaphone, Image as ImageIcon, ChevronDown, ChevronUp, Zap, Clock, Info, Award, Calendar, ExternalLink } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface AdminDashboardProps {
  state: AppState;
  updateState: (partial: Partial<AppState>) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, updateState, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'categories' | 'products' | 'hero' | 'ads' | 'offers' | 'help' | 'brands'>('orders');
  const [editingId, setEditingId] = useState<string | null>(null);

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

  // Generic Update Helpers
  // Fix: Simplified updateItem to avoid generic inference issues with AppState
  const updateItem = (key: keyof AppState, id: string, partial: any) => {
    const list = (state[key] as any[]) || [];
    const newList = list.map(item => item.id === id ? { ...item, ...partial } : item);
    updateState({ [key]: newList });
  };

  // Fix: Simplified deleteItem to match new signature style
  const deleteItem = (key: keyof AppState, id: string) => {
    const list = (state[key] as any[]) || [];
    updateState({ [key]: list.filter(item => item.id !== id) });
  };

  // Specific Handlers
  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      id: Math.random().toString(36).substr(2, 9),
      image: 'https://picsum.photos/seed/new/1600/600',
      title: 'عنوان السلايد الجديد',
      subtitle: 'وصف فرعي للسلايد',
      buttonText: 'تسوق الآن'
    };
    updateState({ heroSlides: [...heroSlides, newSlide] });
    setEditingId(newSlide.id);
  };

  const addAd = () => {
    const newAd: Ad = {
      id: Math.random().toString(36).substr(2, 9),
      image: 'https://via.placeholder.com/1920x290?text=New+Ad+Banner'
    };
    updateState({ ads: [...ads, newAd] });
    setEditingId(newAd.id);
  };

  const addOffer = () => {
    if (products.length === 0) return alert('يجب إضافة منتجات أولاً');
    const newOffer: SpecialOffer = {
      id: Math.random().toString(36).substr(2, 9),
      productId: products[0].id,
      endTime: new Date(Date.now() + 86400000).toISOString(),
      offerPrice: products[0].price * 0.9
    };
    updateState({ specialOffers: [...specialOffers, newOffer] });
    setEditingId(newOffer.id);
  };

  // Fix: Added missing addCategory handler
  const addCategory = () => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'قسم جديد',
      image: 'https://picsum.photos/400/400'
    };
    updateState({ categories: [...categories, newCat] });
    setEditingId(newCat.id);
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
              onClick={() => { setActiveTab(tab.id as any); setEditingId(null); }}
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
               <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white font-black shadow-lg shadow-accent/20">A</div>
            </div>
          </div>

          <div className="lg:hidden border-t overflow-x-auto scrollbar-hide bg-white">
            <div className="flex items-center px-4 py-3 gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setEditingId(null); }}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl flex-shrink-0 transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                >
                  <tab.icon size={18} />
                  <span className="text-[10px] font-black">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          
          {/* Orders Section */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-black text-gray-800 flex items-center gap-2"><ShoppingBag size={20} className="text-accent" /> الطلبات الواردة</h3>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">إجمالي: {orders.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">رقم الطلب</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">العميل</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">المجموع</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">الحالة</th>
                        <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">التفاصيل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-6 py-5 text-sm font-black text-primary">#{order.id}</td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-800">{order.customerName}</span>
                              <span className="text-xs text-gray-400 font-mono">{order.phoneNumber}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm font-black text-accent">{order.total} د.أ</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                              {order.status === 'pending' ? 'بانتظار التأكيد' : 'تم التوصيل'}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                             <button className="text-xs font-bold text-blue-500 hover:underline">عرض المنتجات</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-2xl text-primary">إدارة واجهة المتجر (السلايدر)</h3>
                <button onClick={addHeroSlide} className="bg-accent text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black shadow-lg shadow-accent/20">
                  <Plus size={20} /> إضافة سلايدر جديد
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {heroSlides.map(slide => (
                  <div key={slide.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="w-full md:w-64 h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border">
                         <img src={slide.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                         <div>
                            <h4 className="font-black text-gray-800 text-lg">{slide.title}</h4>
                            <p className="text-sm text-gray-400 font-bold">{slide.subtitle}</p>
                         </div>
                         <div className="flex gap-2 mt-4">
                            <button onClick={() => setEditingId(editingId === slide.id ? null : slide.id)} className={`px-5 py-2 rounded-xl font-bold ${editingId === slide.id ? 'bg-primary text-white' : 'bg-blue-50 text-blue-500'}`}>تعديل</button>
                            <button onClick={() => deleteItem('heroSlides', slide.id)} className="p-2 bg-red-50 text-red-500 rounded-xl"><Trash2 size={20}/></button>
                         </div>
                      </div>
                    </div>
                    {editingId === slide.id && (
                      <div className="p-6 border-t bg-gray-50/50 space-y-4 animate-slide">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input className="p-4 bg-white rounded-xl border-none outline-none font-bold shadow-sm" placeholder="عنوان السلايد" value={slide.title} onChange={e => updateItem('heroSlides', slide.id, {title: e.target.value})} />
                           <input className="p-4 bg-white rounded-xl border-none outline-none font-bold shadow-sm" placeholder="النص الفرعي" value={slide.subtitle} onChange={e => updateItem('heroSlides', slide.id, {subtitle: e.target.value})} />
                           <input className="p-4 bg-white rounded-xl border-none outline-none font-bold shadow-sm" placeholder="رابط الصورة" value={slide.image} onChange={e => updateItem('heroSlides', slide.id, {image: e.target.value})} />
                           <input className="p-4 bg-white rounded-xl border-none outline-none font-bold shadow-sm" placeholder="نص الزر" value={slide.buttonText} onChange={e => updateItem('heroSlides', slide.id, {buttonText: e.target.value})} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ads Section */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-2xl text-primary">إدارة بنرات الإعلانات</h3>
                <button onClick={addAd} className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black">
                  <Plus size={20} /> إضافة بنر جديد
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {ads.map(ad => (
                  <div key={ad.id} className="bg-white rounded-3xl border p-6 flex flex-col md:flex-row items-center gap-6">
                    <img src={ad.image} className="w-full md:w-80 h-24 object-cover rounded-xl border" />
                    <div className="flex-1 flex flex-col gap-4">
                       <input className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary" value={ad.image} placeholder="رابط صورة البنر" onChange={e => updateItem('ads', ad.id, {image: e.target.value})} />
                       <div className="flex justify-end">
                          <button onClick={() => deleteItem('ads', ad.id)} className="text-red-500 font-bold bg-red-50 px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all">
                             <Trash2 size={18} /> حذف البنر
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offers Section */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-2xl text-primary">إدارة عروض الفلاش (التوقيت المباشر)</h3>
                <button onClick={addOffer} className="bg-accent text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black shadow-lg shadow-accent/20">
                  <Zap size={20} /> إضافة عرض مؤقت
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {specialOffers.map(offer => {
                  const product = products.find(p => p.id === offer.productId);
                  return (
                    <div key={offer.id} className="bg-white rounded-3xl border p-6 group">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gray-50 border p-2 flex-shrink-0">
                           <img src={product?.image} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 text-center md:text-right">
                           <h4 className="font-black text-gray-800">{product?.name || 'منتج غير موجود'}</h4>
                           <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                              <span className="text-gray-400 line-through text-xs">{product?.price} د.أ</span>
                              <span className="text-accent font-black">{offer.offerPrice} د.أ</span>
                              <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1"><Clock size={10}/> {new Date(offer.endTime).toLocaleString('ar-JO')}</span>
                           </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingId(editingId === offer.id ? null : offer.id)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold">تعديل</button>
                          <button onClick={() => deleteItem('specialOffers', offer.id)} className="p-3 bg-red-50 text-red-500 rounded-xl"><Trash2 size={18}/></button>
                        </div>
                      </div>
                      {editingId === offer.id && (
                        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide">
                           <div className="flex flex-col gap-2">
                             <label className="text-xs font-black text-gray-400 mr-2 uppercase">المنتج</label>
                             <select className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none" value={offer.productId} onChange={e => updateItem('specialOffers', offer.id, {productId: e.target.value})}>
                               {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                             </select>
                           </div>
                           <div className="flex flex-col gap-2">
                             <label className="text-xs font-black text-gray-400 mr-2 uppercase">سعر العرض</label>
                             <input type="number" className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none" value={offer.offerPrice} onChange={e => updateItem('specialOffers', offer.id, {offerPrice: Number(e.target.value)})} />
                           </div>
                           <div className="flex flex-col gap-2">
                             <label className="text-xs font-black text-gray-400 mr-2 uppercase">وقت الانتهاء</label>
                             <input type="datetime-local" className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none" value={offer.endTime.slice(0, 16)} onChange={e => updateItem('specialOffers', offer.id, {endTime: new Date(e.target.value).toISOString()})} />
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                        <input className="w-full font-black border-none bg-transparent" value={cat.name} onChange={e => updateItem('categories', cat.id, {name: e.target.value})}/>
                        <input className="w-full text-[10px] text-gray-400 border-none bg-transparent truncate" value={cat.image} onChange={e => updateItem('categories', cat.id, {image: e.target.value})}/>
                      </div>
                      <button onClick={() => deleteItem('categories', cat.id)} className="text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
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
                      onChange={e => updateItem('helpSections', section.id, {content: e.target.value})}
                    />
                 </div>
               ))}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="font-black text-2xl text-primary">المنتجات المعروضة</h3>
                <button onClick={() => {
                  const newProd: Product = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: 'منتج جديد',
                    price: 0,
                    category: categories[0]?.name || 'غير مصنف',
                    image: 'https://picsum.photos/400/400',
                    description: 'وصف مختصر...'
                  };
                  updateState({ products: [newProd, ...products] });
                  setEditingId(newProd.id);
                }} className="w-full sm:w-auto bg-accent text-white px-8 py-3 rounded-2xl flex items-center justify-center gap-3 font-black">
                  <Plus size={20} /> إضافة منتج جديد
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl p-5 border shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl border flex-shrink-0 overflow-hidden">
                         <img src={p.image} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 text-center md:text-right">
                        <h4 className="font-black text-gray-800 text-lg">{p.name}</h4>
                        <span className="text-accent font-black">{p.price} د.أ</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(editingId === p.id ? null : p.id)} className={`px-5 py-2 rounded-xl font-bold ${editingId === p.id ? 'bg-primary text-white' : 'bg-blue-50 text-blue-500'}`}>تعديل</button>
                        <button onClick={() => deleteItem('products', p.id)} className="p-3 bg-red-50 text-red-500 rounded-xl"><Trash2 size={18} /></button>
                      </div>
                    </div>
                    {editingId === p.id && (
                      <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide">
                         <div className="space-y-4">
                            <input className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" value={p.name} placeholder="اسم المنتج" onChange={e => updateItem('products', p.id, {name: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                               <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" value={p.price} placeholder="السعر" onChange={e => updateItem('products', p.id, {price: Number(e.target.value)})} />
                               <select className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" value={p.category} onChange={e => updateItem('products', p.id, {category: e.target.value})}>
                                 {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                               </select>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <textarea className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none h-32" value={p.description} placeholder="وصف المنتج" onChange={e => updateItem('products', p.id, {description: e.target.value})} />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brands Tab */}
          {activeTab === 'brands' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-2xl text-primary">إدارة الماركات</h3>
                <button onClick={() => {
                  const newB: Brand = { id: Math.random().toString(36).substr(2, 9), name: 'ماركة جديدة', logo: 'https://via.placeholder.com/150x50', image: 'https://picsum.photos/800/600' };
                  updateState({ brands: [...brands, newB] });
                }} className="bg-primary text-white p-3 rounded-2xl"><Plus/></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map(brand => (
                  <div key={brand.id} className="bg-white p-6 rounded-3xl border relative group">
                     <button onClick={() => deleteItem('brands', brand.id)} className="absolute top-4 left-4 text-red-400"><Trash2 size={18}/></button>
                     <img src={brand.logo} className="h-12 mx-auto mb-4 object-contain" />
                     <input className="w-full text-center font-black border-none bg-transparent" value={brand.name} onChange={e => updateItem('brands', brand.id, {name: e.target.value})} />
                     <input className="w-full text-[10px] text-blue-500 mt-2 text-center" value={brand.logo} onChange={e => updateItem('brands', brand.id, {logo: e.target.value})} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
