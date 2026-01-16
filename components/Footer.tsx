
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">اشترك في النشرة الإخبارية</h3>
            <p className="text-gray-500 mb-6 text-sm">لا تفوت الآلاف من العروض الترويجية الرائعة</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="أدخل عنوان بريدك الإلكتروني هنا..." 
                className="flex-1 border p-3 rounded-r-md focus:outline-none focus:border-[#f04e23]"
              />
              <button className="bg-[#f04e23] text-white px-8 py-3 rounded-l-md font-bold hover:bg-[#d03d1a] transition">
                الاشتراك
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">دليل المساعدة</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-[#f04e23] cursor-pointer">مركز المساعدة</li>
              <li className="hover:text-[#f04e23] cursor-pointer">كيف أشتري؟</li>
              <li className="hover:text-[#f04e23] cursor-pointer">الشحن والتسليم</li>
              <li className="hover:text-[#f04e23] cursor-pointer">سياسة المنتج</li>
              <li className="hover:text-[#f04e23] cursor-pointer">كيفية العودة</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">اتصال</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#f04e23]" size={18} />
                <span>الجاردنز - مجمع البكري</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-[#f04e23]" size={18} />
                <span>contact@besa.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#f04e23]" size={18} />
                <div className="flex flex-col">
                  <span>هاتف: 0790999512</span>
                  <span>واتس اب: 0790999512</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Rights */}
        <div className="border-t py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">© 2024 سلة التسوق. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <div className="p-2 rounded-full border hover:text-[#f04e23] cursor-pointer transition"><Facebook size={20} /></div>
            <div className="p-2 rounded-full border hover:text-[#f04e23] cursor-pointer transition"><Twitter size={20} /></div>
            <div className="p-2 rounded-full border hover:text-[#f04e23] cursor-pointer transition"><Instagram size={20} /></div>
            <div className="p-2 rounded-full border hover:text-[#f04e23] cursor-pointer transition"><Youtube size={20} /></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
