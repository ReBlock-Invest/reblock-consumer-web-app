import React, { ReactNode, useLayoutEffect, useState } from "react"

type Context = {
  scrollPosition: number
  windowWidth: number
}

export const WindowContext = React.createContext<Context>({
  scrollPosition: 0,
  windowWidth: 0
})

type Props = {
  children: ReactNode
}

const WindowContextProvider: React.FC<Props> = ({children}) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        scrollPosition,
        windowWidth,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export default WindowContextProvider