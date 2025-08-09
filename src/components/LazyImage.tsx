import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Generate placeholder if not provided
  const defaultPlaceholder = placeholder || `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 40}" height="${height || 40}" viewBox="0 0 ${width || 40} ${height || 40}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width || 40}" height="${height || 40}" fill="#111111"/>
      <circle cx="${(width || 40)/2}" cy="${(height || 40)/2}" r="4" fill="#e5ff00" opacity="0.3"/>
    </svg>
  `)}`;

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);
  
  const optimizedSrc = getOptimizedImageUrl(src, width, height, 'auto');

  return (
    <img
      ref={imgRef}
      src={isInView ? optimizedSrc : defaultPlaceholder}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    />
  );
};

export default LazyImage;