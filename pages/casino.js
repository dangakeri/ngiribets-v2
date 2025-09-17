import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import Header from "../components/authenticated"; // Adjust the import path as necessary
import Footer from "../components/footer"; // Adjust the import path as necessary
import BannerCarousel from "../components/banners";
import IconScrollableArea from "../components/scroll";

import ImageGallery from "../components/casino";
import { API_URL } from "../utils/config";
import FooterContent from "../components/footerContent";
import { useUser } from "../contexts/UserContext"; // Import the useUser hook
import Link from "next/link"; // Import the Link component
const banners = [
  { image: "/images/33.avif", alt: "Banner 1" },
  { image: "/images/77.avif", alt: "Banner 2" },
  { image: "/images/44.avif", alt: "Banner 3" },
];

export default function Dashboard() {
  const { user } = useUser(); // Access the user data from context

  useEffect(() => {
    if (!user) {
      // If there's no user, redirect to login page
      Router.push("/login");
    }
  }, [user]); // Depend on user, rerun when user data changes

  return (
    <div>
      <Header />
      <main>
        <IconScrollableArea />

        <BannerCarousel banners={banners} />

        <ImageGallery />

        <FooterContent />
      </main>

      <Footer />
    </div>
  );
}
