
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { HeroSlide } from '../types';

interface HeroProps {
  slides: HeroSlide[];
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ slides, onShopNow }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[350px] md:h-[550px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center px-4 md:px-20">
            <div className={`max-w-xl text-white transform transition-all duration-700 delay-300 ${index === current ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-10 text-gray-200 border-r-4 border-accent pr-6">{slide.subtitle}</p>
              <button 
                onClick={onShopNow}
                className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded font-black text-lg transition-all shadow-xl hover:scale-105"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4">
        <button 
          onClick={prev}
          className="p-3 rounded-full border border-white/50 text-white hover:bg-white hover:text-primary transition-all"
        >
          <ChevronRight size={24} />
        </button>
        <button 
          onClick={next}
          className="p-3 rounded-full border border-white/50 text-white hover:bg-white hover:text-primary transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all ${i === current ? 'bg-accent w-12' : 'bg-white/30 w-6'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
