
import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 mb-16">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryClick(cat)}
          className="flex flex-col items-center group cursor-pointer bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary transition-all hover:shadow-xl"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 bg-gray-50 border-2 border-transparent group-hover:border-accent transition-all p-2">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h3 className="text-sm md:text-base font-black text-primary text-center group-hover:text-accent transition-colors">{cat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
