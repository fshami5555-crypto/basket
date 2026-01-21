
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
    { id: 'brands', label: 'العلامات التجارية', icon: Award },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'hero', label: 'الهيرو (Slider)', icon: LayoutPanelLeft },
    { id: 'ads', label: 'إعلانات الموقع', icon: Megaphone },
    { id: 'offers', label: 'عروض الفلاش', icon: Zap },
    { id: 'help', label: 'دليل المساعدة', icon: Info },
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
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <img src={LOGO_URL} alt="Logo" className="h-8 w-auto brightness-0 invert" />
          <span className="font-bold text-lg">لوحة الإدارة</span>
        </div>

        <nav className="flex-grow mt-6 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${activeTab === tab.id ? 'bg-[#f04e23] text-white' : 'text-gray-400 hover:bg-slate-800'}`}
            >
              <tab.icon size={20} />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="p-6 flex items-center gap-4 text-gray-400 hover:text-white transition-colors border-t border-slate-800"
        >
          <LogOut size={20} />
          <span>العودة للمتجر</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">مرحباً، مدير النظام</span>
            <div className="w-10 h-10 rounded-full bg-[#f04e23] flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-bold">تتبع الطلبات</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 border-b text-sm">رقم الطلب</th>
                      <th className="px-6 py-3 border-b text-sm">اسم الزبون</th>
                      <th className="px-6 py-3 border-b text-sm">رقم الهاتف</th>
                      <th className="px-6 py-3 border-b text-sm">التاريخ</th>
                      <th className="px-6 py-3 border-b text-sm">الإجمالي</th>
                      <th className="px-6 py-3 border-b text-sm">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 border-b text-sm font-mono">{order.id}</td>
                        <td className="px-6 py-4 border-b text-sm">{order.customerName}</td>
                        <td className="px-6 py-4 border-b text-sm">{order.phoneNumber}</td>
                        <td className="px-6 py-4 border-b text-sm">{order.date}</td>
                        <td className="px-6 py-4 border-b text-sm font-bold">{order.total} د.أ</td>
                        <td className="px-6 py-4 border-b text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Brands Tab */}
          {activeTab === 'brands' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-xl flex items-center gap-2"><Award className="text-accent" /> إدارة العلامات التجارية</h3>
                <button onClick={addBrand} className="bg-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-primary-dark shadow-lg">
                  <Plus size={20} /> إضافة ماركة جديدة
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brands.map((brand) => (
                  <div key={brand.id} className="border-2 border-gray-100 rounded-3xl p-6 hover:border-primary/20 transition-all relative group bg-gray-50/30">
                    <button 
                      onClick={() => deleteBrand(brand.id)}
                      className="absolute top-4 left-4 text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-1 uppercase">اسم الماركة</label>
                        <input 
                          className="w-full border-b-2 border-transparent focus:border-primary p-2 bg-transparent outline-none font-bold text-gray-800"
                          value={brand.name}
                          onChange={(e) => updateBrand(brand.id, { name: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-1">رابط الشعار (Logo)</label>
                        <input 
                          className="w-full border p-2 rounded-lg bg-white text-xs text-blue-500 font-mono"
                          value={brand.logo}
                          onChange={(e) => updateBrand(brand.id, { logo: e.target.value })}
                        />
                        <div className="h-12 flex items-center justify-center bg-white border mt-2 rounded-lg p-2">
                          <img src={brand.logo} className="max-h-full max-w-full object-contain" alt="Logo Preview" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-400 mb-1">رابط الصورة التعبيرية</label>
                        <input 
                          className="w-full border p-2 rounded-lg bg-white text-xs text-blue-500 font-mono"
                          value={brand.image}
                          onChange={(e) => updateBrand(brand.id, { image: e.target.value })}
                        />
                        <div className="aspect-[4/3] w-full bg-white border mt-2 rounded-lg overflow-hidden">
                          <img src={brand.image} className="w-full h-full object-cover" alt="Image Preview" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold">إدارة الأقسام</h3>
                <button onClick={addCategory} className="bg-[#f04e23] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold hover:bg-[#d03d1a]">
                  <Plus size={18} /> إضافة قسم
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} className="border rounded-lg p-4 flex gap-4 items-center group relative">
                    <img src={cat.image} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-1">
                      <input 
                        className="font-bold border-b border-transparent focus:border-gray-300 w-full mb-1 bg-transparent" 
                        value={cat.name} 
                        onChange={(e) => {
                          const newCats = categories.map(c => c.id === cat.id ? {...c, name: e.target.value} : c);
                          updateState({ categories: newCats });
                        }}
                      />
                      <input 
                        className="text-xs text-blue-500 w-full truncate border-b border-transparent focus:border-gray-300 bg-transparent" 
                        value={cat.image} 
                        onChange={(e) => {
                          const newCats = categories.map(c => c.id === cat.id ? {...c, image: e.target.value} : c);
                          updateState({ categories: newCats });
                        }}
                      />
                    </div>
                    <button onClick={() => deleteCategory(cat.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold">إدارة المنتجات وتفاصيلها</h3>
                <button onClick={addProduct} className="bg-[#f04e23] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold hover:bg-[#d03d1a]">
                  <Plus size={18} /> إضافة منتج جديد
                </button>
              </div>
              <div className="divide-y">
                {products.map(p => (
                  <div key={p.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <img src={p.image} className="w-16 h-16 rounded-xl object-cover border" />
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{p.name}</h4>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{p.category}</span>
                            <span className="font-bold text-[#f04e23]">{p.price} د.أ</span>
                            {p.discountPrice ? <span className="text-green-600">خصم: {p.discountPrice} د.أ</span> : null}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setEditingProductId(editingProductId === p.id ? null : p.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 font-bold"
                        >
                          {editingProductId === p.id ? <ChevronUp size={20} /> : <ImageIcon size={20} />}
                          {editingProductId === p.id ? 'إغلاق التفاصيل' : 'تعديل التفاصيل'}
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Edit Form */}
                    {editingProductId === p.id && (
                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-2xl border border-blue-100 shadow-inner">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-bold mb-2">اسم المنتج</label>
                            <input 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none" 
                              value={p.name}
                              onChange={(e) => {
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, name: e.target.value} : pr);
                                updateState({ products: newProds });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold mb-2">السعر الأصلي</label>
                              <input 
                                type="number"
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none"
                                value={p.price}
                                onChange={(e) => {
                                  const newProds = products.map(pr => pr.id === p.id ? {...pr, price: Number(e.target.value)} : pr);
                                  updateState({ products: newProds });
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold mb-2">سعر الخصم (اختياري)</label>
                              <input 
                                type="number"
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none text-green-600 font-bold"
                                value={p.discountPrice || 0}
                                onChange={(e) => {
                                  const newProds = products.map(pr => pr.id === p.id ? {...pr, discountPrice: Number(e.target.value)} : pr);
                                  updateState({ products: newProds });
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2">القسم</label>
                            <select 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none"
                              value={p.category}
                              onChange={(e) => {
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, category: e.target.value} : pr);
                                updateState({ products: newProds });
                              }}
                            >
                              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2">شرح مختصر (للواجهة)</label>
                            <input 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none"
                              value={p.description}
                              onChange={(e) => {
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, description: e.target.value} : pr);
                                updateState({ products: newProds });
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-bold mb-2">رابط الصورة الرئيسية</label>
                            <input 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none text-xs"
                              value={p.image}
                              onChange={(e) => {
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, image: e.target.value} : pr);
                                updateState({ products: newProds });
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2">روابط الصور الإضافية (رابط في كل سطر)</label>
                            <textarea 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none text-xs h-24"
                              value={(p.images || []).join('\n')}
                              onChange={(e) => {
                                const images = e.target.value.split('\n').filter(line => line.trim() !== '');
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, images} : pr);
                                updateState({ products: newProds });
                              }}
                              placeholder="أدخل رابط كل صورة في سطر جديد"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-2">تفاصيل المنتج الكاملة</label>
                            <textarea 
                              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#f04e23] outline-none h-40 text-sm leading-relaxed"
                              value={p.longDescription || ''}
                              onChange={(e) => {
                                const newProds = products.map(pr => pr.id === p.id ? {...pr, longDescription: e.target.value} : pr);
                                updateState({ products: newProds });
                              }}
                              placeholder="أدخل مواصفات المنتج وتفاصيله الفنية..."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">إدارة الهيرو سلايدر</h3>
                <button onClick={addSlide} className="bg-[#f04e23] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold hover:bg-[#d03d1a]">
                  <Plus size={18} /> إضافة سلايد
                </button>
              </div>
              <div className="space-y-8">
                {heroSlides.map((slide, index) => (
                  <div key={slide.id} className="border rounded-lg p-6 bg-gray-50 relative group">
                    <button 
                      onClick={() => updateState({ heroSlides: heroSlides.filter(s => s.id !== slide.id) })}
                      className="absolute top-4 left-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={20} />
                    </button>
                    <span className="inline-block bg-[#f04e23] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">سلايد #{index + 1}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-1">العنوان الرئيسي</label>
                          <input 
                            className="w-full border p-2 rounded" 
                            value={slide.title} 
                            onChange={(e) => {
                              const newSlides = heroSlides.map(s => s.id === slide.id ? {...s, title: e.target.value} : s);
                              updateState({ heroSlides: newSlides });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-1">العنوان الفرعي</label>
                          <input 
                            className="w-full border p-2 rounded" 
                            value={slide.subtitle} 
                            onChange={(e) => {
                              const newSlides = heroSlides.map(s => s.id === slide.id ? {...s, subtitle: e.target.value} : s);
                              updateState({ heroSlides: newSlides });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-1">نص الزر</label>
                          <input 
                            className="w-full border p-2 rounded" 
                            value={slide.buttonText} 
                            onChange={(e) => {
                              const newSlides = heroSlides.map(s => s.id === slide.id ? {...s, buttonText: e.target.value} : s);
                              updateState({ heroSlides: newSlides });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1">رابط صورة الخلفية</label>
                        <input 
                          className="w-full border p-2 rounded mb-2 text-xs" 
                          value={slide.image} 
                          onChange={(e) => {
                            const newSlides = heroSlides.map(s => s.id === slide.id ? {...s, image: e.target.value} : s);
                            updateState({ heroSlides: newSlides });
                          }}
                        />
                        <div className="aspect-video rounded bg-gray-200 overflow-hidden relative">
                          <img src={slide.image} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Offers Tab */}
          {activeTab === 'offers' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2 text-red-600"><Zap /> إدارة عروض الفلاش (مؤقت تنازلي)</h3>
                <button onClick={addOffer} className="bg-red-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-red-700 shadow-lg">
                  <Plus size={20} /> إضافة عرض فلاش
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {specialOffers.map((offer) => (
                  <div key={offer.id} className="border-2 border-red-50 rounded-3xl p-6 bg-red-50/20 relative group hover:border-red-200 transition-colors">
                    <button 
                      onClick={() => deleteOffer(offer.id)}
                      className="absolute top-4 left-4 text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                    >
                      <Trash2 size={24} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2">اختر المنتج</label>
                        <select 
                          className="w-full border-2 p-3 rounded-2xl focus:border-red-500 outline-none bg-white font-bold"
                          value={offer.productId}
                          onChange={(e) => {
                            const selectedProd = products.find(p => p.id === e.target.value);
                            const newOffers = specialOffers.map(o => o.id === offer.id ? {...o, productId: e.target.value, offerPrice: selectedProd ? selectedProd.price * 0.7 : o.offerPrice} : o);
                            updateState({ specialOffers: newOffers });
                          }}
                        >
                          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2">تاريخ ووقت الانتهاء</label>
                        <div className="flex items-center gap-2 bg-white border-2 p-3 rounded-2xl">
                          <Clock size={20} className="text-red-500" />
                          <input 
                            type="datetime-local"
                            className="w-full outline-none font-bold"
                            value={offer.endTime.substring(0, 16)}
                            onChange={(e) => {
                              const newOffers = specialOffers.map(o => o.id === offer.id ? {...o, endTime: new Date(e.target.value).toISOString()} : o);
                              updateState({ specialOffers: newOffers });
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2">السعر الخاص بالعرض</label>
                        <div className="flex items-center gap-2 bg-white border-2 p-3 rounded-2xl">
                          <input 
                            type="number"
                            className="w-full outline-none font-black text-red-600 text-xl"
                            value={offer.offerPrice}
                            onChange={(e) => {
                              const newOffers = specialOffers.map(o => o.id === offer.id ? {...o, offerPrice: Number(e.target.value)} : o);
                              updateState({ specialOffers: newOffers });
                            }}
                          />
                          <span className="font-bold text-gray-400">د.أ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Info className="text-blue-500" /> تعديل محتوى دليل المساعدة</h3>
              <div className="space-y-12">
                {helpSections.map((section) => (
                  <div key={section.id} className="border-b pb-12 last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <h4 className="font-black text-gray-400 uppercase text-xs tracking-widest mb-2">معرف القسم</h4>
                        <div className="bg-gray-100 px-3 py-1 rounded-lg inline-block font-mono text-xs">{section.id}</div>
                      </div>
                      <div className="md:col-span-3 space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">عنوان الصفحة</label>
                          <input 
                            className="w-full border-2 p-3 rounded-xl focus:border-[#f04e23] outline-none font-bold text-lg" 
                            value={section.title} 
                            onChange={(e) => updateHelpSection(section.id, { title: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">المحتوى</label>
                          <textarea 
                            className="w-full border-2 p-4 rounded-xl focus:border-[#f04e23] outline-none h-48 leading-relaxed text-gray-600" 
                            value={section.content} 
                            onChange={(e) => updateHelpSection(section.id, { content: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ads Tab */}
          {activeTab === 'ads' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">إعلانات الموقع (البانرات)</h3>
                <button onClick={addAd} className="bg-[#f04e23] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold hover:bg-[#d03d1a]">
                  <Plus size={18} /> إضافة إعلان
                </button>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {ads.map((ad, index) => (
                  <div key={ad.id} className="border rounded-lg p-6 bg-gray-50 relative group">
                    <button 
                      onClick={() => deleteAd(ad.id)}
                      className="absolute top-4 left-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={20} />
                    </button>
                    <label className="block text-sm font-bold mb-1">رابط صورة الإعلان #{index + 1}</label>
                    <input 
                      className="w-full border p-2 rounded mb-4 text-sm" 
                      value={ad.image} 
                      onChange={(e) => {
                        const newAds = ads.map(a => a.id === ad.id ? {...a, image: e.target.value} : a);
                        updateState({ ads: newAds });
                      }}
                    />
                    <div className="w-full h-32 rounded bg-gray-200 overflow-hidden shadow-inner">
                      <img src={ad.image} className="w-full h-full object-cover" />
                    </div>
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
