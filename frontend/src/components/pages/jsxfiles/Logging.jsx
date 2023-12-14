
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Implement login logic (e.g., call your backend endpoint)
    // Set the user data if login is successful
    const credentials = {
        username: username,
        password: password
      };

    try {
      const response = await fetch('http://localhost:3002/verifylogin', {
        method: 'POST',
        body: JSON.stringify({ credentials }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok){
        const result = await response.json();
        alert('Logged in')
        console.log('Authenticated: ', result.authenticated);
        if(result.authenticated == false){
          alert('Username or password wrong');
        }

        setUser(result.user)
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
     // Adjust this line according to your user data
  };

  const logout = () => {
    // Implement logout logic (e.g., clear user data)
    alert('logged out');
    setUser(null);
  };

  const register = async (uname, pwd) => {

    const credentials = {
      'uname': uname,
      'pwd': pwd,
    };

    console.log(credentials);
  try {
    const response = await fetch('http://localhost:3002/db/users', {
      method: 'POST',
      body: JSON.stringify({ credentials }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok){
      const result = await response.json();
      console.log('register' ,result);
      alert('Account created');
    }else{
      console.error('Failed to register:', response.statusText);
    }
    
    
    
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
  };

  useEffect(() => {
    // Implement any initial setup (e.g., check if the user is already logged in)
  }, []);

  const value = { login, logout, register, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
