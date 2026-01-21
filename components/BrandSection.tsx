
import React from 'react';
import { Brand } from '../types';

interface BrandSectionProps {
  brands: Brand[];
}

// Fixed: Moved BrandItem outside to prevent re-creation and fix TypeScript 'key' prop error
const BrandItem: React.FC<{ brand: Brand }> = ({ brand }) => (
  <div className="flex flex-col items-center">
    {/* Logo */}
    <div className="h-12 md:h-16 w-full flex items-center justify-center mb-4 px-4">
      <img 
        src={brand.logo} 
        alt={brand.name} 
        className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
      />
    </div>
    {/* Product Image */}
    <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={brand.image} 
        alt={`${brand.name} lifestyle`} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
      />
    </div>
  </div>
);

const BrandSection: React.FC<BrandSectionProps> = ({ brands }) => {
  if (!brands || brands.length === 0) return null;

  // تقسيم الماركات إلى صفين كما في الصورة
  const topRow = brands.slice(0, 4);
  const bottomRow = brands.slice(4, 7);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">علاماتنا التجارية</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Top Row (4 Brands) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
          {topRow.map(brand => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Bottom Row (3 Brands) - Centered on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl mx-auto">
          {bottomRow.map(brand => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
