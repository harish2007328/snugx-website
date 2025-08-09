// Image optimization utilities
export const getOptimizedImageUrl = (url: string, width?: number, height?: number, format?: 'webp' | 'avif' | 'auto') => {
  // For Unsplash images, add optimization parameters
  if (url.includes('images.unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (format && format !== 'auto') params.set('fm', format);
    params.set('fit', 'crop');
    params.set('q', '80'); // Quality optimization
    
    return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
  }
  
  return url;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const createImagePlaceholder = (width: number, height: number, color = '#111111') => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
      <path d="M${width/2} ${height/2}L${width/2} ${height/2}" stroke="#e5ff00" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};