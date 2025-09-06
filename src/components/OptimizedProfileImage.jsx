import { memo, useCallback, useState } from 'react';

const OptimizedProfileImage = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="relative">
      {/* Only show one thing at a time */}
      {imageError ? (
        /* Error fallback */
        <div className="profile-image bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <p className="text-xs">Profile Image</p>
          </div>
        </div>
      ) : (
        <>
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="profile-image img-loading animate-pulse bg-gray-200"></div>
          )}
          
          {/* Optimized responsive picture element */}
          <picture className={!imageLoaded ? 'absolute inset-0' : ''}>
            {/* WebP source - using optimized version */}
            <source
              srcSet="/profile-2.webp"
              type="image/webp"
            />
            
            {/* JPEG fallback */}
            <img
              src="/profile.jpg"
              alt="Prom Sereyreaksa - Creative Technologist and Software Engineer"
              width="448"
              height="448"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className={`profile-image transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </picture>
        </>
      )}
    </div>
  );
});

OptimizedProfileImage.displayName = 'OptimizedProfileImage';

export default OptimizedProfileImage;
