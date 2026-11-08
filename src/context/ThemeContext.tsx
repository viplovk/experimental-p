import React from 'react'

export const ThemeContext = React.createContext({
  colorMode: 'dark',
  setColorMode: (mode: 'dark' | 'light') => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={{ colorMode: 'dark', setColorMode: () => {} }}>
    {children}
  </ThemeContext.Provider>
)