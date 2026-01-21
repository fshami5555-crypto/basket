
import { AppState } from './types';

export const LOGO_URL = "https://springgreen-leopard-502388.hostingersite.com/wp-content/uploads/2021/06/Untitled-1.png";

export const INITIAL_STATE: AppState = {
  categories: [
    { id: '1', name: 'عناية وجمال', image: 'https://picsum.photos/seed/care/400/400' },
    { id: '2', name: 'أجهزة رياضة ومساج', image: 'https://picsum.photos/seed/sport/400/400' },
    { id: '3', name: 'أجهزة كهربائية للمطبخ', image: 'https://picsum.photos/seed/kitchen/400/400' },
    { id: '4', name: 'أجهزة كهربائية للمنزل', image: 'https://picsum.photos/seed/home/400/400' },
    { id: '5', name: 'ماكينات قهوة', image: 'https://picsum.photos/seed/coffee/400/400' },
  ],
  brands: [
    { id: 'b1', name: 'ARISTON', logo: 'https://seeklogo.com/images/A/ariston-logo-C79F3795A4-seeklogo.com.png', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
    { id: 'b2', name: 'CONTI', logo: 'https://springgreen-leopard-502388.hostingersite.com/wp-content/uploads/2021/06/conti.png', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
    { id: 'b3', name: 'PHILIPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Philips_logo_new.svg/1280px-Philips_logo_new.svg.png', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800' },
    { id: 'b4', name: 'HISENSE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hisense_logo.svg/1280px-Hisense_logo.svg.png', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800' },
    { id: 'b5', name: 'OPERA', logo: 'https://springgreen-leopard-502388.hostingersite.com/wp-content/uploads/2021/06/opera.png', image: 'https://images.unsplash.com/photo-1590794056226-77ee3d416075?auto=format&fit=crop&q=80&w=800' },
    { id: 'b6', name: 'VESTEL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vestel_logo.svg/1280px-Vestel_logo.svg.png', image: 'https://images.unsplash.com/photo-1571175432248-356073167195?auto=format&fit=crop&q=80&w=800' },
    { id: 'b7', name: 'LA GERMANIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/La_Germania_logo.svg/1280px-La_Germania_logo.svg.png', image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d7824?auto=format&fit=crop&q=80&w=800' },
  ],
  products: [
    { id: 'p1', name: 'محضرة طعام احترافية', price: 120, category: 'أجهزة كهربائية للمطبخ', image: 'https://picsum.photos/seed/p1/500/500', description: 'خلاط ومحضرة طعام متعددة الوظائف بقوة 1000 واط.' },
    { id: 'p2', name: 'ماكينة إسبريسو', price: 85, category: 'ماكينات قهوة', image: 'https://picsum.photos/seed/p2/500/500', description: 'ماكينة قهوة إيطالية لتحضير أفضل أنواع الإسبريسو.' },
    { id: 'p3', name: 'مكواة بخار تيفال', price: 45, category: 'أجهزة كهربائية للمنزل', image: 'https://picsum.photos/seed/p3/500/500', description: 'مكواة بخار قوية وسهلة الاستخدام.' },
    { id: 'p4', name: 'جهاز مساج الرقبة', price: 30, category: 'أجهزة رياضة ومساج', image: 'https://picsum.photos/seed/p4/500/500', description: 'مساج مريح للرقبة والأكتاف مع خاصية التسخين.' },
  ],
  heroSlides: [
    { 
      id: 'h1', 
      image: 'https://picsum.photos/seed/hero1/1600/600', 
      title: 'المتجر الأول في الأردن', 
      subtitle: 'المرخص والمعتمد لدى الوكالات الكهربائية', 
      buttonText: 'تسوق الآن' 
    },
    { 
      id: 'h2', 
      image: 'https://picsum.photos/seed/hero2/1600/600', 
      title: 'عروض خاصة لفترة محدودة', 
      subtitle: 'خصومات تصل إلى 50% على الأجهزة المنزلية', 
      buttonText: 'شاهد العروض' 
    }
  ],
  ads: [
    { id: 'ad1', image: 'https://springgreen-leopard-502388.hostingersite.com/wp-content/uploads/2024/08/toys_slider_desk_ar-1920x290-1.jpg' }
  ],
  specialOffers: [],
  orders: [],
  helpSections: [
    { id: 'help-guide', title: 'دليل المساعدة', content: '...' },
    { id: 'help-center', title: 'مركز المساعدة', content: '...' },
    { id: 'how-to-buy', title: 'كيف أشتري؟', content: '...' },
    { id: 'shipping', title: 'الشحن والتسليم', content: '...' },
    { id: 'product-policy', title: 'سياسة المنتج', content: '...' },
    { id: 'returns', title: 'كيفية العودة', content: '...' },
  ]
};
