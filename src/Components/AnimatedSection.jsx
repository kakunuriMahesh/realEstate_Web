import React, { useEffect, useRef, useState } from 'react';
import './animations.css';

const AnimatedSection = ({ animationClass, children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div ref={ref} className={isVisible ? animationClass : ''}>
      {children}
    </div>
  );
};

export default AnimatedSection;
