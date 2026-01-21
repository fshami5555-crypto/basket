
import React from 'react';
import { HelpSection } from '../types';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface HelpPageProps {
  section: HelpSection;
  onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ section, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-[#f04e23] font-bold flex items-center gap-2 hover:underline"
      >
        <ArrowRight size={20} /> العودة للرئيسية
      </button>

      <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 text-[#f04e23]">
          <div className="bg-[#f04e23]/10 p-4 rounded-2xl">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-800">{section.title}</h1>
        </div>
        
        <div className="prose max-w-none">
          <div className="text-gray-600 text-lg leading-loose whitespace-pre-wrap">
            {section.content}
          </div>
        </div>
        
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-500 mb-4">هل ما زلت بحاجة إلى مساعدة؟</p>
          <a 
            href="https://wa.me/962790999512" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            تواصل معنا عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
