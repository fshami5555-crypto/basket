
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface FooterProps {
  onHelpClick?: (sectionId: string) => void;
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onHelpClick, onContactClick }) => {
  return (
    <footer className="bg-primary text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <img src={LOGO_URL} alt="Logo" className="h-12 w-auto brightness-0 invert" />
            <p className="text-gray-300 text-sm leading-relaxed">
              سلة التسوق هي الوجهة الرائدة للأجهزة الكهربائية في الأردن. نلتزم بتقديم أفضل الماركات العالمية بضمان رسمي وخدمة ما بعد البيع استثنائية.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">عن المتجر</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li onClick={() => onHelpClick?.('help-guide')} className="hover:text-accent cursor-pointer transition">دليل المستخدم</li>
              <li onClick={() => onHelpClick?.('shipping')} className="hover:text-accent cursor-pointer transition">سياسة التوصيل</li>
              <li onClick={() => onHelpClick?.('returns')} className="hover:text-accent cursor-pointer transition">سياسة الإرجاع</li>
              <li onClick={onContactClick} className="hover:text-accent cursor-pointer transition">فروعنا</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">خدمة العملاء</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li onClick={() => onHelpClick?.('help-center')} className="hover:text-accent cursor-pointer transition">مركز الدعم</li>
              <li onClick={() => onHelpClick?.('how-to-buy')} className="hover:text-accent cursor-pointer transition">كيفية الشراء</li>
              <li onClick={() => onHelpClick?.('product-policy')} className="hover:text-accent cursor-pointer transition">الضمان والكفالة</li>
              <li className="hover:text-accent cursor-pointer transition">تتبع الطلب</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">تواصل معنا</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="text-accent flex-shrink-0" size={18} />
                <span>عمان - شارع الجاردنز - مجمع البكري</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-accent flex-shrink-0" size={18} />
                <span>info@basketshop.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-accent flex-shrink-0" size={18} />
                <div className="flex flex-col">
                  <span className="font-bold text-white">0790999512</span>
                  <span className="text-xs">متاحون من 9:00 ص - 9:00 م</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2024 سلة التسوق (Basket Shop) - جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
