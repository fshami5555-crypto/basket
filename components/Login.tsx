
import React, { useState } from 'react';
import { X, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // البيانات الفعلية ما زالت admin@shop.com / admin123 ولكن الحقول تظهر فارغة
    if (email === 'admin@shop.com' && password === 'admin123') {
      onLogin(true);
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-slide">
        <button 
          onClick={onClose} 
          className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>
        
        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-2">دخول الإدارة</h2>
            <p className="text-gray-400 text-sm">يرجى إدخال بيانات الاعتماد الخاصة بك</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest mr-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 pr-12 rounded-2xl outline-none transition-all font-bold"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest mr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 pr-12 rounded-2xl outline-none transition-all font-bold"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <button className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
