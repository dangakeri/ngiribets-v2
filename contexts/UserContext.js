import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { API_URL } from '../utils/config';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user only if it's not already set in state
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Router.push('/');
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data == null) {
          localStorage.removeItem('token');
          Router.push('/');
        } else {
          setUser(response.data);
        }
      } catch (error) {
        Router.push('/');
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]); // Dependency on `user` to fetch only if not present

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
