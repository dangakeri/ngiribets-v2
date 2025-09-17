import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data on mount if token exists
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data)); // Persist user data
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
