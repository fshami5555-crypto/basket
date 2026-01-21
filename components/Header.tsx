
import React from 'react';
import { Search, ShoppingCart, User, Phone, MapPin } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { Category } from '../types';

interface HeaderProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  onHomeClick: () => void;
  onOffersClick: () => void;
  onContactClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  cartTotal: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onAdminClick, 
  isAdmin, 
  categories, 
  onCategoryClick, 
  onHomeClick, 
  onOffersClick,
  onContactClick,
  onCartClick,
  cartCount,
  cartTotal
}) => {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-primary-dark text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> 0790999512</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> الأردن - عمان</span>
          </div>
          <div className="flex gap-4">
            <button onClick={onContactClick} className="hover:text-gray-300">اتصل بنا</button>
            <button onClick={onAdminClick} className="hover:text-gray-300">{isAdmin ? 'لوحة الإدارة' : 'دخول الموظفين'}</button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={onHomeClick}>
            <img src={LOGO_URL} alt="Basket Shop" className="h-10 md:h-12 w-auto" />
          </div>

          {/* Search Box */}
          <div className="flex-grow max-w-2xl relative hidden md:block">
            <div className="flex overflow-hidden rounded-lg border-2 border-primary">
              <input 
                type="text" 
                placeholder="ابحث عن منتجك المفضل..." 
                className="flex-grow px-4 py-2 outline-none text-sm"
              />
              <button className="bg-primary text-white px-6 py-2 hover:bg-primary-dark transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* User & Cart */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onAdminClick}
              className="flex flex-col items-center gap-1 text-primary hover:text-accent transition-colors"
            >
              <User size={24} />
              <span className="text-[10px] font-bold hidden sm:block">حسابي</span>
            </button>
            <div 
              onClick={onCartClick}
              className="relative flex flex-col items-center gap-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-[10px] font-bold hidden sm:block">السلة: {cartTotal.toFixed(0)} د.أ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Menu Bar */}
      <nav className="bg-primary text-white overflow-x-auto scrollbar-hide">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 text-sm font-semibold whitespace-nowrap">
            <li 
              onClick={onHomeClick}
              className="hover:text-accent cursor-pointer transition flex items-center gap-2 border-l border-white/20 pl-6"
            >
              الرئيسية
            </li>
            {categories.map(cat => (
              <li 
                key={cat.id} 
                onClick={() => onCategoryClick(cat)}
                className="hover:text-accent cursor-pointer transition"
              >
                {cat.name}
              </li>
            ))}
            <li 
              onClick={onOffersClick}
              className="bg-accent px-4 py-1 rounded text-white animate-pulse font-black cursor-pointer"
            >
              العروض المميزة
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
