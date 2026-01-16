
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onSeeAll?: () => void;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, onSeeAll, onProductClick, onAddToCart }) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        {onSeeAll && (
          <button 
            onClick={onSeeAll}
            className="text-[#f04e23] font-semibold hover:underline"
          >
            مشاهدة الكل
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const hasDiscount = product.discountPrice && product.discountPrice < product.price;
          
          return (
            <div 
              key={product.id} 
              onClick={() => onProductClick?.(product)}
              className="bg-white rounded-lg shadow-sm border p-4 group hover:shadow-lg transition-all cursor-pointer relative"
            >
              {hasDiscount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                  خصم {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                </div>
              )}
              <div className="aspect-square rounded-md overflow-hidden mb-4 relative bg-gray-50 border border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
                  className="absolute bottom-2 left-2 bg-white p-2 rounded-full shadow-md text-[#f04e23] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f04e23] hover:text-white"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
              <p className="text-[10px] text-[#f04e23] font-bold mb-1 uppercase tracking-wider">{product.category}</p>
              <h3 className="font-bold text-gray-800 mb-2 h-10 overflow-hidden text-sm leading-tight">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-black text-gray-900 leading-none">
                    {hasDiscount ? product.discountPrice : product.price} <span className="text-xs">د.أ</span>
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through decoration-red-400">
                      {product.price} د.أ
                    </span>
                  )}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
                  className="bg-gray-50 text-gray-400 p-2 rounded hover:bg-[#f04e23] hover:text-white transition-colors"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;
