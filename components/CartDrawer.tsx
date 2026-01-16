
import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (customerName: string, phoneNumber: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('يرجى إدخال الاسم ورقم الهاتف');
    onCheckout(name, phone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#f04e23]" />
            <h2 className="text-xl font-bold text-gray-800">سلة المشتريات</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={64} className="mb-4" />
              <p className="text-lg font-bold">السلة فارغة حالياً</p>
              <button onClick={onClose} className="mt-4 text-[#f04e23] underline">تصفح المنتجات</button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-gray-50 p-4 rounded-2xl group">
                  <img src={item.product.image} className="w-20 h-20 rounded-xl object-cover border bg-white" alt={item.product.name} />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.product.name}</h3>
                      <p className="text-[#f04e23] font-black text-sm">
                        {item.product.discountPrice || item.product.price} د.أ
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="text-gray-500 hover:text-[#f04e23] disabled:opacity-20" disabled={item.quantity <= 1}>
                          <Minus size={16} />
                        </button>
                        <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="text-gray-500 hover:text-[#f04e23]">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button onClick={() => onRemoveItem(item.product.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            {!isCheckingOut ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-bold">الإجمالي:</span>
                  <span className="text-2xl font-black text-gray-900">{subtotal.toFixed(2)} د.أ</span>
                </div>
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[#f04e23] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#d03d1a] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#f04e23]/20"
                >
                  المتابعة لإتمام الطلب
                </button>
              </>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4 animate-slide-up">
                <h3 className="font-bold text-gray-700">بيانات التوصيل</h3>
                <input 
                  type="text" 
                  placeholder="الاسم الكامل" 
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#f04e23]" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="رقم الهاتف" 
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#f04e23]" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <div className="flex gap-2 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-3"
                  >
                    <Send size={18} />
                    إرسال للواتساب
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 border-2 rounded-2xl font-bold text-gray-500 hover:bg-gray-100"
                  >
                    رجوع
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
