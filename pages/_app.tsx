// pages/_app.tsx
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserProvider } from "../contexts/UserContext";
import SocketProvider from "../contexts/socketContext"; // Import the SocketProvider
import { AppProps } from "next/app"; // Import AppProps for type safety

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a page loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds (or change this to be based on actual loading)
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SocketProvider>
        <UserProvider>
          {loading && <Loader />} {/* Show loader while loading */}
          <Component {...pageProps} />
        </UserProvider>
      </SocketProvider>
    </>
  );
};

export default MyApp;
