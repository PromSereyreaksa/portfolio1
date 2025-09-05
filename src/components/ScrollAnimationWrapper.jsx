import { animationVariants, useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ScrollAnimationWrapper({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0,
  threshold = 0.1,
  className = '',
  triggerOnce = true 
}) {
  const [elementRef, isVisible] = useScrollAnimation({
    threshold,
    delay,
    triggerOnce
  });

  const variant = animationVariants[animation];
  
  const classes = `
    ${variant.initial} 
    ${isVisible ? variant.animate : ''} 
    ${variant.transition}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  );
}
