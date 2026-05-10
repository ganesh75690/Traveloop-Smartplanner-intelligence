import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const transitionTypes = {
  'default': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  'fade': 'fadeIn 0.4s ease-out',
  'slideLeft': 'slideInLeft 0.5s ease-out',
  'slideRight': 'slideInRight 0.5s ease-out',
  'slideUp': 'slideInFromBottom 0.5s ease-out',
  'slideDown': 'slideInFromTop 0.5s ease-out',
  'scale': 'scaleIn 0.4s ease-out',
  'zoom': 'zoomIn 0.5s ease-out',
  'flip': 'flipIn 0.6s ease-out'
};

export default function RouteTransition({ 
  children, 
  type = 'default',
  className = '',
  duration = null 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger animation when route changes
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const animation = transitionTypes[type] || transitionTypes.default;
  const customDuration = duration ? `${duration}ms` : null;

  return (
    <div 
      className={`route-transition ${className}`}
      style={{
        animation: isVisible ? animation : 'none',
        animationDuration: customDuration || undefined,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
}

// Preset configurations for different page types
export const pageTransitions = {
  welcome: { type: 'fade', duration: 800 },
  dashboard: { type: 'slideUp', duration: 600 },
  auth: { type: 'scale', duration: 500 },
  profile: { type: 'slideLeft', duration: 500 },
  trips: { type: 'slideUp', duration: 600 },
  createTrip: { type: 'slideRight', duration: 500 },
  settings: { type: 'slideLeft', duration: 500 }
};
