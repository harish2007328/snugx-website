import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedLottieProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const OptimizedLottie: React.FC<OptimizedLottieProps> = ({ 
  src, 
  className = '', 
  loop = true, 
  autoplay = true 
}) => {
  const [LottieComponent, setLottieComponent] = useState<any>(null);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && !LottieComponent) {
      // Dynamically import Lottie only when needed
      import('@lottiefiles/dotlottie-react').then(({ DotLottieReact }) => {
        setLottieComponent(() => DotLottieReact);
      });
    }
  }, [isIntersecting, LottieComponent]);

  return (
    <div ref={elementRef} className={className}>
      {LottieComponent ? (
        <LottieComponent
          src={src}
          loop={loop}
          autoplay={autoplay && isIntersecting}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-white/5 rounded animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedLottie;