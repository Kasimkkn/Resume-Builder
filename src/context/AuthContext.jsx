import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', userData);
    const loggedInUser = response.data;
    setUser(loggedInUser.user);
    localStorage.setItem('user', JSON.stringify(loggedInUser.user));
    localStorage.setItem('token', loggedInUser.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${loggedInUser.token}`;
    return loggedInUser;
  };

  const signup = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    const registeredUser = response.data;
    return registeredUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
