import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../utils/config';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [onlineCount, setOnlineCount] = useState(0);
  const socket = useRef(null); // Use a ref to hold the socket instance

  useEffect(() => {
    if (socket.current) return; // If a socket connection already exists, do not create a new one

    const token = localStorage.getItem('token'); // Retrieve token from local storage or another secure location

    if (!token) {
      console.error('No token found');
      return;
    }

    socket.current = io(API_URL, {
      query: { token }, // Send token as a query parameter
    });

    socket.current.on('connect', () => {
      console.log('Connected to server');
    });

    socket.current.on('updateOnlineUsers', (count) => {
      setOnlineCount(count);
    });
    
    socket.current.on('notify-success', (message) => {
      console.log('Notification received:', message);
     // setNotification(message);
      setTimeout(() => setNotification(''), 5000); // Clear the notification after 5 seconds
    });

    socket.current.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log('Disconnected from Socket.io server');
        socket.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ onlineCount, socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
