import { useEffect, useState } from 'react';

const ImageLoader = ({ src, alt, className, children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Delay showing loader to prevent flash
    const loaderTimer = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        setShowLoader(true);
      }
    }, 100);

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setShowLoader(false);
      clearTimeout(loaderTimer);
    };
    img.onerror = () => {
      setImageError(true);
      setShowLoader(false);
      clearTimeout(loaderTimer);
    };
    img.src = src;

    return () => clearTimeout(loaderTimer);
  }, [src, imageLoaded, imageError]);

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Image - always rendered but with opacity control */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
      />
      
      {/* Loading overlay - only show after delay and if needed */}
      {showLoader && !imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          {children || (
            <div className="flex flex-col items-center space-y-2 z-10">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              <div className="text-gray-500 text-xs font-light">Loading...</div>
            </div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Image unavailable</div>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
