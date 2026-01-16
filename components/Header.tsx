
import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { Category } from '../types';

interface HeaderProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  onHomeClick: () => void;
  onOffersClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdmin, categories, onCategoryClick, onHomeClick, onOffersClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#f04e23] text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <img src={LOGO_URL} alt="Basket Shop" className="h-12 w-auto brightness-0 invert" />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl w-full flex">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="البحث في أكثر من 20000 منتج..." 
                className="w-full px-4 py-2 rounded-r-md text-gray-800 focus:outline-none"
              />
              <button className="absolute left-0 top-0 bottom-0 bg-white/20 px-4 rounded-l-md hover:bg-white/30">
                <Search size={20} />
              </button>
            </div>
            <select className="bg-white text-gray-800 px-4 py-2 rounded-l-md border-r border-gray-200 hidden md:block">
              <option>الجميع</option>
              {categories.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <User size={24} />
              <div className="text-sm hidden sm:block text-right">
                <p className="font-semibold">{isAdmin ? 'لوحة التحكم' : 'حسابي'}</p>
                <p className="text-xs opacity-80">تسجيل الدخول</p>
              </div>
            </button>
            <div className="relative flex items-center gap-2 hover:opacity-80 transition cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
              <div className="text-sm hidden sm:block text-right">
                <p className="font-semibold">سلة التسوق</p>
                <p className="text-xs opacity-80">0.00 د.أ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="container mx-auto px-4 flex items-center justify-center md:justify-start">
          <ul className="flex items-center gap-8 py-3 text-sm font-semibold text-gray-700">
            <li 
              onClick={onHomeClick}
              className="hover:text-[#f04e23] cursor-pointer transition pb-1"
            >
              الصفحة الرئيسية
            </li>
            {categories.map(cat => (
              <li 
                key={cat.id} 
                onClick={() => onCategoryClick(cat)}
                className="hover:text-[#f04e23] cursor-pointer transition"
              >
                {cat.name}
              </li>
            ))}
            <li 
              onClick={onOffersClick}
              className="text-[#f04e23] font-bold cursor-pointer transition border-b-2 border-[#f04e23] pb-1"
            >
              عروض خاصة
            </li>
            <li className="hover:text-[#f04e23] cursor-pointer transition">اتصل بنا</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
