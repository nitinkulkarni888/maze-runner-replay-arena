
import React from 'react';
import GoogleAd from './GoogleAds';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const getAdSlot = () => {
    switch (position) {
      case 'top':
        return '1234567890'; // Replace with your actual ad slot ID
      case 'bottom':
        return '1234567891'; // Replace with your actual ad slot ID
      case 'sidebar':
        return '1234567892'; // Replace with your actual ad slot ID
      default:
        return '1234567890';
    }
  };

  const getAdFormat = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'horizontal' as const;
      case 'sidebar':
        return 'vertical' as const;
      default:
        return 'auto' as const;
    }
  };

  return (
    <div className={`ad-banner ${position} ${className}`}>
      <div className="text-xs text-muted-foreground text-center mb-2">
        Advertisement
      </div>
      <GoogleAd 
        adSlot={getAdSlot()}
        adFormat={getAdFormat()}
        className="w-full"
      />
    </div>
  );
};

export default AdBanner;
