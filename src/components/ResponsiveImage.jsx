import { memo, useState, useRef, useEffect } from 'react';

const ResponsiveImage = memo(({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  // Generate responsive srcSet for different screen sizes
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const baseName = baseSrc.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    const ext = baseSrc.match(/\.(webp|jpg|jpeg|png)$/i)?.[1] || 'webp';
    
    // Create srcSet for different sizes - adjust these based on your actual image sizes needed
    const sizes = [480, 768, 1024, 1200];
    
    return sizes
      .map(size => {
        // For now, we'll use the original images but you can add size variants later
        return `${baseSrc} ${size}w`;
      })
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  // Intersection Observer for lazy loading (unless priority)
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            const img = imgRef.current;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error fallback */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      <img
        ref={imgRef}
        src={priority ? src : undefined}
        data-src={priority ? undefined : src}
        srcSet={priority ? generateSrcSet(src) : undefined}
        sizes={sizes}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
