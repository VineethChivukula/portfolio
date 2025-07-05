// Performance and utility functions
import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for managing GSAP animations with proper cleanup
 * @param {Function} animationFn - Function that creates GSAP animations
 * @param {Array} deps - Dependencies array
 * @returns {Object} Animation reference for manual control
 */
export const useGSAPAnimation = (animationFn, deps = []) => {
  const animationsRef = useRef([]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedAnimationFn = useCallback(animationFn, [animationFn, ...deps]);

  useEffect(() => {
    // Clear previous animations
    animationsRef.current.forEach(animation => animation.kill());
    animationsRef.current = [];

    // Create new animations
    const animations = memoizedAnimationFn();
    animationsRef.current = Array.isArray(animations) ? animations : [animations];

    return () => {
      animationsRef.current.forEach(animation => animation.kill());
    };
  }, [memoizedAnimationFn]);

  return animationsRef;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if device prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Intersection Observer hook for lazy loading and animations
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting, entry];
};
