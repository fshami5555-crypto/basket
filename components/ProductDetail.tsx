
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const allImages = [product.image, ...(product.images || [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="mb-8 text-[#f04e23] font-bold flex items-center gap-2 hover:underline"
      >
        <ArrowRight size={20} /> العودة للتسوق
      </button>

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === img ? 'border-[#f04e23] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-[#f04e23]/10 text-[#f04e23] px-3 py-1 rounded-full text-xs font-bold mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">السعر الحالي</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-[#f04e23]">
                    {hasDiscount ? product.discountPrice : product.price} <span className="text-xl">د.أ</span>
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-gray-400 line-through decoration-red-500 decoration-2">
                      {product.price} د.أ
                    </span>
                  )}
                </div>
              </div>
              {hasDiscount && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold animate-pulse">
                  خصم {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle2 size={20} />
                <span className="font-semibold">متوفر في المخزون</span>
              </div>
              <div className="flex items-center gap-3 text-blue-600">
                <CheckCircle2 size={20} />
                <span className="font-semibold">توصيل سريع لكافة المحافظات</span>
              </div>
            </div>

            <button className="w-full bg-[#f04e23] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-[#d03d1a] transition-all transform hover:scale-[1.02] shadow-xl shadow-[#f04e23]/20">
              <ShoppingCart size={28} />
              أضف إلى سلة المشتريات
            </button>
          </div>
        </div>

        {/* Detailed Description Section */}
        {product.longDescription && (
          <div className="border-t bg-gray-50 p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">تفاصيل المنتج</h3>
            <div className="prose max-w-none text-gray-600 whitespace-pre-wrap leading-loose">
              {product.longDescription}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
