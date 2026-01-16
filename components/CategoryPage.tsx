
import React from 'react';
import { Product, Category } from '../types';
import ProductSection from './ProductSection';

interface CategoryPageProps {
  category: Category;
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, products, onBack, onProductClick }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-[#f04e23] font-bold flex items-center gap-2 hover:underline"
      >
        <span>&larr;</span> العودة للرئيسية
      </button>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border mb-12 flex flex-col md:flex-row items-center gap-8">
        <img src={category.image} alt={category.name} className="w-48 h-48 rounded-full object-cover border-4 border-[#f04e23]" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{category.name}</h1>
          <p className="text-gray-500">استكشف مجموعتنا المختارة من منتجات {category.name} بأفضل الأسعار في الأردن.</p>
        </div>
      </div>

      <ProductSection 
        title={`منتجات ${category.name}`} 
        products={products} 
        onProductClick={onProductClick}
      />
      
      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed">
          <p className="text-gray-400 text-lg">لا يوجد منتجات في هذا القسم حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
