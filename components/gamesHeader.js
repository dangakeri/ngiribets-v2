import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported

import Link from "next/link"; // Import the Link component
import Router from "next/router";
import Modal from "../components/modal";
import NotificationListener from "../components/listener";
import { API_URL } from "../utils/config";
import { useSelector } from "react-redux";
const Header = () => {
  const [user, setUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.push("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //console.log('Fetched user data:', response.data); // Debugging line

        if (response.data == null) {
          localStorage.removeItem("token");
          Router.push("/login");
        } else {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Debugging line
        Router.push("/login");
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <NotificationListener />
    </div>
  );
};

export default Header;
