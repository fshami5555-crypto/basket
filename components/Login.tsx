
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('admin@shop.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@shop.com' && password === 'admin123') {
      onLogin(true);
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 left-4 p-1 hover:bg-gray-100 rounded-full transition">
          <X size={24} />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">لوحة تحكم المدير</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-md focus:border-[#f04e23] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">كلمة المرور</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded-md focus:border-[#f04e23] focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-[#f04e23] text-white py-3 rounded-md font-bold text-lg hover:bg-[#d03d1a] transition">
              دخول
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            استخدم بيانات التجربة: admin@shop.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
