import { useLayoutEffect, useState } from "react"

const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

type BreakPointsKey = keyof typeof breakpoints

type Options = {
  [key in BreakPointsKey]: number
}

function useResponsiveValue(options: Options, defaultValue?: number) {
  const [activeBreakpoint, setActiveBreakpoint] = useState<BreakPointsKey>("md")

  useLayoutEffect(() => {
    function updateSize() {
      const size = window.innerWidth;
      const foundBreakpoint = Object.keys(breakpoints).find((breakpoint) => size <= breakpoints[breakpoint as BreakPointsKey]) as BreakPointsKey;
      if (foundBreakpoint) {
        setActiveBreakpoint(foundBreakpoint);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return options[activeBreakpoint] || defaultValue || 16;
}

export default useResponsiveValue;
