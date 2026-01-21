
import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-16">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryClick(cat)}
          className="group cursor-pointer bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,51,102,0.1)] hover:-translate-y-2 border-b-4 hover:border-b-primary active:scale-95"
        >
          {/* Square Image Container */}
          <div className="aspect-square w-full rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-4 group-hover:bg-blue-50/50 transition-colors">
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          
          {/* Label */}
          <div className="text-center">
            <h3 className="text-sm md:text-base font-black text-primary group-hover:text-accent transition-colors">
              {cat.name}
            </h3>
            <div className="w-0 group-hover:w-full h-0.5 bg-accent mx-auto mt-1 transition-all duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
