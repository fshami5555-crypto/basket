
export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  longDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface Ad {
  id: string;
  image: string;
  link?: string;
}

export interface SpecialOffer {
  id: string;
  productId: string;
  endTime: string; // ISO string
  offerPrice: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
  items: { productName: string; quantity: number; price: number }[];
}

export interface HelpSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

export interface AppState {
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  orders: Order[];
  ads: Ad[];
  specialOffers?: SpecialOffer[];
  helpSections: HelpSection[];
}
