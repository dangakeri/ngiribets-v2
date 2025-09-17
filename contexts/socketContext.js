import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../utils/config';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage or another secure location
    const socketIo = io(API_URL, {
      query: { token }, // Send token as a query parameter
    });

    socketIo.on('connect', () => {
      console.log('Connected to server');
    });

    socketIo.on('updateOnlineUsers', (count) => {
      setOnlineCount(count);
    });

    socketIo.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
      console.log('Disconnected from Socket.io server');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ onlineCount, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
