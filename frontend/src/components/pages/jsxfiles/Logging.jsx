
import { createContext, useContext, useState, useEffect } from 'react';

const Logging = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Implement login logic (e.g., call your backend endpoint)
    // Set the user data if login is successful
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic (e.g., clear user data)
    setUser(null);
  };

  const getUser = () => {
    // Implement getting user data (e.g., check if user is logged in)
    return user;
  };

  useEffect(() => {
    // Implement any initial setup (e.g., check if the user is already logged in)
  }, []);

  const value = { login, logout, getUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(Logging);
};
