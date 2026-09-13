'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Format a number with comma separation and optional decimal places.
 * e.g., 5000 -> "5,000", 4.8 -> "4.8"
 */
export const formatStatNumber = (num, decimals = 0) => {
  if (typeof num !== 'number' || isNaN(num)) return '0';

  if (decimals > 0) {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    return `${Number(intPart).toLocaleString('en-US')}.${decPart}`;
  }

  return Math.round(num).toLocaleString('en-US');
};

/**
 * Custom React Hook: useCountUp
 * Smoothly animates a number from 0 to targetValue using requestAnimationFrame and easeOutCubic.
 * Can be triggered via external boolean or internal IntersectionObserver.
 *
 * @param {Object|number} config - Target number or config object
 * @param {number} [config.targetValue] - The target number to count up to
 * @param {number} [config.duration=2000] - Duration in milliseconds
 * @param {number} [config.decimals=0] - Number of decimal places
 * @param {boolean} [config.start=true] - Whether to start animation
 */
export function useCountUp(config, maybeDuration, maybeDecimals, maybeStart) {
  // Support both object config and positional parameters
  let targetValue = 0;
  let duration = 2000;
  let decimals = 0;
  let start = true;

  if (typeof config === 'object' && config !== null) {
    targetValue = config.targetValue ?? 0;
    duration = config.duration ?? 2000;
    decimals = config.decimals ?? 0;
    start = config.start ?? true;
  } else {
    targetValue = Number(config) || 0;
    if (maybeDuration !== undefined) duration = maybeDuration;
    if (maybeDecimals !== undefined) decimals = maybeDecimals;
    if (maybeStart !== undefined) start = maybeStart;
  }

  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasObserved, setHasObserved] = useState(false);

  // Native IntersectionObserver for auto-scroll trigger if ref is attached
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = elementRef.current;
    if (!node || hasObserved) return;

    if (!('IntersectionObserver' in window)) {
      setHasObserved(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasObserved(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasObserved]);

  // Determine if animation should run (either start is true AND/OR observed)
  const isTriggered = elementRef.current ? (hasObserved && start) : start;

  // requestAnimationFrame count-up animation
  useEffect(() => {
    if (!isTriggered) return;

    let startTime = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutCubic for natural decelerating motion
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = ease * targetValue;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTriggered, targetValue, duration]);

  const formattedValue = formatStatNumber(count, decimals);

  return {
    value: count,
    formattedValue,
    ref: elementRef,
  };
}

export default useCountUp;
