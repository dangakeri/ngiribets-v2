import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../utils/config';
import { AiOutlineCheck } from 'react-icons/ai';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const NotificationListener = () => {
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const socketRef = useRef(null);
  const modalRef = useRef(null);
  const { setUser } = useUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken || '');
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    if (!socketRef.current || !socketRef.current.connected) {
      socketRef.current = io(`${API_URL}/crash`, {
        query: { token },
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to WebSocket server on /crash namespace');
      });

      socketRef.current.on('notify-success', async (message) => {
        setNotification(message);
        setLoading(true);
        setIsFinished(false);

        try {
          const res = await axios.get(`${API_URL}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          console.error('Failed to fetch updated user data');
        }

        setTimeout(() => {
          setIsFinished(true);
        }, 700);

        setTimeout(() => {
          setNotification('');
        }, 3000);
      });

      socketRef.current.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
      });

      socketRef.current.on('error', (err) => {
        console.error('Socket.IO error:', err.message);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token]);

  const handleRedirect = () => {
    setNotification('');
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleRedirect();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); stroke-dashoffset: 440; }
            100% { transform: rotate(360deg); stroke-dashoffset: 0; }
          }
        `}
      </style>

      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            ref={modalRef}
            onClick={handleRedirect}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                color: 'green',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              Success
            </h2>

            {loading && (
              <div
                style={{
                  marginBottom: '20px',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80px',
                  width: '80px',
                  margin: '0 auto',
                }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 120 120"
                  style={{ transform: 'rotate(0deg)', display: 'block' }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#f3f3f3"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3498db"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="440"
                    strokeDashoffset={isFinished ? 0 : 440}
                    style={{
                      transition: 'stroke-dashoffset 0.7s ease',
                    }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '48px',
                    color: 'green',
                    fontWeight: 'bold',
                    display: 'block',
                  }}
                >
                  <AiOutlineCheck />
                </div>
              </div>
            )}

            <p
              style={{
                marginBottom: '20px',
                fontSize: '16px',
                fontWeight: '500',
                color: 'green',
              }}
            >
              {notification}
            </p>

          
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationListener;