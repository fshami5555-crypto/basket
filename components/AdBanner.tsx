
import React from 'react';

interface AdBannerProps {
  image: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ image }) => {
  return (
    <div className="w-full my-12 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01]">
      <img src={image} alt="Advertisement" className="w-full h-auto object-cover min-h-[100px]" />
    </div>
  );
};

export default AdBanner;
