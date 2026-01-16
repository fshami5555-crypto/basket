
import React from 'react';
import { Product, SpecialOffer } from '../types';
import ProductSection from './ProductSection';
import CountdownTimer from './CountdownTimer';
import { Timer, Zap } from 'lucide-react';

interface SpecialOffersPageProps {
  products: Product[];
  specialOffers: SpecialOffer[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const SpecialOffersPage: React.FC<SpecialOffersPageProps> = ({ products, specialOffers, onBack, onProductClick, onAddToCart }) => {
  // Filter products that have a standard discount
  const discountedProducts = products.filter(p => p.discountPrice && p.discountPrice < p.price);

  // Map special offers to their products
  const flashSaleItems = (specialOffers || []).map(offer => {
    const product = products.find(p => p.id === offer.productId);
    if (!product) return null;
    return {
      ...product,
      offerPrice: offer.offerPrice,
      endTime: offer.endTime
    };
  }).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-[#f04e23] font-bold flex items-center gap-2 hover:underline"
      >
        <span>&larr;</span> العودة للرئيسية
      </button>

      <div className="bg-gradient-to-r from-[#f04e23] to-[#ff8c00] rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            <Zap className="fill-current" size={48} /> عروض خاصة وحصرية
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            استفد من أقوى الخصومات المتاحة حالياً في متجرنا. عروض محدودة الوقت وأسعار لا تقبل المنافسة!
          </p>
        </div>
        <Zap className="absolute -bottom-10 -right-10 opacity-10 rotate-12" size={300} />
      </div>

      {/* Flash Sales Section */}
      {flashSaleItems.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
              <Timer size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800">عروض الفلاش</h2>
              <p className="text-gray-500">ينتهي العرض قريباً، تسوق الآن قبل فوات الأوان!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashSaleItems.map((item: any) => (
              <div 
                key={item.id}
                onClick={() => onProductClick(item)}
                className="bg-white rounded-3xl border border-red-100 p-6 relative group hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white px-6 py-2 rounded-bl-3xl font-black z-20">
                  عرض حصري
                </div>
                
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50 border relative">
                  <img src={item.image} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 z-30">
                    <CountdownTimer endTime={item.endTime} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center justify-between bg-red-50 p-4 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-sm text-red-400 font-bold line-through">{item.price} د.أ</span>
                      <span className="text-3xl font-black text-red-600">{item.offerPrice} د.أ</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                      className="bg-red-600 text-white p-4 rounded-xl shadow-lg group-hover:bg-black transition-colors"
                    >
                      <Zap size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Discounted Products */}
      <ProductSection 
        title="جميع المنتجات المخفضة" 
        products={discountedProducts} 
        onProductClick={onProductClick}
        onAddToCart={onAddToCart}
      />
      
      {discountedProducts.length === 0 && flashSaleItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <p className="text-gray-400 text-lg">لا يوجد عروض خاصة حالياً، ترقبونا قريباً!</p>
        </div>
      )}
    </div>
  );
};

export default SpecialOffersPage;
