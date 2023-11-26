import { WindowContext } from 'components/contexts/WindowContextProvider';
import { useState, useEffect, useContext } from 'react';

const useInterpolateScrollValue = (x: number, y: number, a: number, b: number) => {
  const {scrollPosition} = useContext(WindowContext)
  const [interpolatedValue, setInterpolatedValue] = useState(x);

  useEffect(() => {
    const normalizedScroll = Math.min(Math.max(scrollPosition, a), b);
    const range = b - a;
    const normalizedValue = (normalizedScroll - a) / range;
    const interpolated = x + normalizedValue * (y - x);
    setInterpolatedValue(interpolated);
  }, [a, b, x, y, scrollPosition]);

  return interpolatedValue;
};

export default useInterpolateScrollValue;