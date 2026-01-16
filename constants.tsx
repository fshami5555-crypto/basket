
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
  orders: [
    { 
      id: 'ord-1001', 
      customerName: 'أحمد علي', 
      phoneNumber: '0791234567', 
      total: 120, 
      status: 'pending', 
      date: '2024-05-20',
      // Fix: Add missing price property to match the Order interface
      items: [{ productName: 'محضرة طعام احترافية', quantity: 1, price: 120 }]
    }
  ]
};
