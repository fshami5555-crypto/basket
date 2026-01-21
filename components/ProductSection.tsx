
import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 border-b-2 border-primary/10 pb-2">
        <h2 className="text-xl md:text-2xl font-black text-primary border-r-4 border-accent pr-4">{title}</h2>
        {onSeeAll && (
          <button 
            onClick={onSeeAll}
            className="text-primary font-bold hover:text-accent text-sm"
          >
            مشاهدة جميع المنتجات &larr;
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const hasDiscount = product.discountPrice && product.discountPrice < product.price;
          
          return (
            <div 
              key={product.id} 
              onClick={() => onProductClick?.(product)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden product-card transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-square relative p-4 bg-white overflow-hidden group">
                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full z-10 shadow-md">
                    وفر {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button 
                    onClick={(e) => { e.stopPropagation(); onProductClick?.(product); }}
                    className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-tighter">{product.category}</p>
                <h3 className="font-bold text-gray-800 mb-3 h-10 overflow-hidden text-sm leading-snug group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <div className="flex flex-col mb-4">
                    {hasDiscount ? (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          {product.price.toFixed(0)} د.أ
                        </span>
                        <span className="text-xl font-black text-accent leading-none">
                          {product.discountPrice?.toFixed(0)} <span className="text-xs">د.أ</span>
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-black text-primary leading-none">
                        {product.price.toFixed(0)} <span className="text-xs">د.أ</span>
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
                    className="w-full bg-primary text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCart size={14} />
                    أضف إلى السلة
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;
