import React from 'react'

export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={{ isAuthenticated: false, user: null, login: () => {}, logout: () => {} }}>
    {children}
  </AuthContext.Provider>
)