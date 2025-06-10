
import React, { useEffect } from 'react';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ 
  adSlot, 
  adFormat = 'auto', 
  className = '',
  style = {}
}) => {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-3899023431262335"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;
