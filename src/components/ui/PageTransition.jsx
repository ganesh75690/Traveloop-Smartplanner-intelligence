import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children, className = "", animation = "fadeInUp" }) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [location.pathname]);

  const animations = {
    fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    fadeIn: 'fadeIn 0.4s ease-out',
    slideInLeft: 'slideInLeft 0.5s ease-out',
    slideInRight: 'slideInRight 0.5s ease-out',
    scaleIn: 'scaleIn 0.4s ease-out'
  };

  return (
    <div 
      className={`page-transition ${isVisible ? `animate-${animation}` : ''} ${className}`}
      style={{
        animation: isVisible ? animations[animation] || animations.fadeInUp : 'none',
        opacity: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  );
}
