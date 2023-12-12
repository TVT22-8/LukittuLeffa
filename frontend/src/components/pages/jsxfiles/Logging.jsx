
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Implement login logic (e.g., call your backend endpoint)
    // Set the user data if login is successful
    console.log(username, password);
    try {
      const response = await fetch('http://localhost:3002/verifylogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: username, password }),
      });

      const verify = await response.json();
      console.log('Data from backend:', verify);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    setUser({ username }); // Adjust this line according to your user data
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

  const value = { login, logout, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
