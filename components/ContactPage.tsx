
import React from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">اتصل بنا</h1>
          <p className="text-gray-500 text-lg">نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في تجربة تسوق ممتعة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="bg-[#f04e23]/10 p-3 rounded-2xl text-[#f04e23]">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">اتصل بنا مباشرة</h3>
                <p className="text-gray-500 text-sm mb-2">متاحون خلال ساعات العمل</p>
                <a href="tel:0790999512" className="text-lg font-black text-[#f04e23] dir-ltr inline-block">0790999512</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="bg-green-500/10 p-3 rounded-2xl text-green-600">
                <Send size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">خدمة الواتساب</h3>
                <p className="text-gray-500 text-sm mb-2">أسرع وسيلة للتواصل</p>
                <a href="https://wa.me/962790999512" className="text-lg font-black text-green-600 dir-ltr inline-block">962790999512</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">ساعات الدوام</h3>
                <p className="text-gray-500 text-sm">السبت - الخميس</p>
                <p className="font-bold text-gray-800">09:00 ص - 09:00 م</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">أرسل لنا رسالة</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                  <input type="text" className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-[#f04e23] outline-none" placeholder="أدخل اسمك هنا..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                  <input type="tel" className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-[#f04e23] outline-none" placeholder="07XXXXXXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الموضوع</label>
                <input type="text" className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-[#f04e23] outline-none" placeholder="عن ماذا تود الاستفسار؟" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الرسالة</label>
                <textarea rows={5} className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-[#f04e23] outline-none" placeholder="اكتب رسالتك هنا..."></textarea>
              </div>
              <button className="w-full bg-[#f04e23] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#d03d1a] transition-all shadow-xl shadow-[#f04e23]/20">
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
