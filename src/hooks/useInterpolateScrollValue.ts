import { useState, useEffect } from 'react';

const useInterpolateScrollValue = (x: number, y: number, a: number, b: number) => {
  const [interpolatedValue, setInterpolatedValue] = useState(x);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const normalizedScroll = Math.min(Math.max(scrollPosition, a), b);
      const range = b - a;
      const normalizedValue = (normalizedScroll - a) / range;
      const interpolated = x + normalizedValue * (y - x);
      console.log('debug1', interpolated)
      setInterpolatedValue(interpolated);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [a, b, x, y]);

  return interpolatedValue;
};

export default useInterpolateScrollValue;