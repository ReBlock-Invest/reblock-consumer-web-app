import { WindowContext } from "components/contexts/WindowContextProvider"
import { useContext, useLayoutEffect, useState } from "react"

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
  [key in BreakPointsKey]: number | boolean | string
}

function useResponsiveValue(options: Options, defaultValue?: number | boolean | string): number | boolean | string {
  const {windowWidth} = useContext(WindowContext)
  const [activeBreakpoint, setActiveBreakpoint] = useState<BreakPointsKey>("md")

  useLayoutEffect(() => {
    const foundBreakpoint = Object.keys(breakpoints).find((breakpoint) => windowWidth <= breakpoints[breakpoint as BreakPointsKey]) as BreakPointsKey;
      if (foundBreakpoint) {
        setActiveBreakpoint(foundBreakpoint);
      }
  }, [windowWidth]);

  return typeof options[activeBreakpoint] === 'undefined' ? defaultValue || 16 : options[activeBreakpoint];
}

export default useResponsiveValue;
