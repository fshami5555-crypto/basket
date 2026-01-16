
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
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear scale-110"
            style={{ backgroundImage: `url(${slide.image})`, transform: index === current ? 'scale(1)' : 'scale(1.1)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#f04e23]/40 to-black/60"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className={`max-w-2xl text-white transform transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">{slide.subtitle}</p>
              <button 
                onClick={onShopNow}
                className="bg-[#f04e23] hover:bg-[#d03d1a] text-white px-8 py-3 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-lg"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prev}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors hidden group-hover:block"
      >
        <ChevronRight size={32} />
      </button>
      <button 
        onClick={next}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors hidden group-hover:block"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
