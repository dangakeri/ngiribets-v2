import React, { useEffect, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import IconScrollableArea from "../components/scroll";
import LiveSportsCarousel from "../components/LiveSportsCarousel";
import FooterContent from "../components/footerContent";
import { API_URL } from "../utils/config";
const BannerCarousel = dynamic(() => import("../components/banners"));
const ImageGallery = dynamic(() => import("../components/games"));
const ImageGalleryOne = dynamic(() => import("../components/bestgames"));
const ImageGalleryThree = dynamic(() => import("../components/topgames"));
import { useUser } from "../contexts/UserContext";
// const banners = [
//   { image: "/images/ban1.avif", alt: "Banner 1" },
//   { image: "/images/ban1.avif", alt: "Banner 2" },
//   { image: "/images/ban1.avif", alt: "Banner 3" },
// ];
const banners = [
  { image: "/images/aero.avif", alt: "Banner 1" },
  { image: "/images/refer.avif", alt: "Banner 2" },
  { image: "/images/aviatrix.avif", alt: "Banner 3" },
  { image: "/images/royale.avif", alt: "Banner 4" },
  { image: "/images/rains.avif", alt: "Banner 5" },
];
export default function Home() {
  const [gameData, setGameData] = useState([]);
  const { user } = useUser(); // Access the user data from context
  const funModeLaunchUrl =
    "https://spsw.gsportsbook.com?serverUrl=https%3A%2F%2Fapispsw.gsportsbook.com";
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/odds/fetch`);
        if (response.ok) {
          const data = await response.json();
          // Transform the data to match the LiveSportsCarousel format
          const formattedData = data.map((game) => ({
            league: `${game.country} ${game.league}`,
            homeTeam: { name: game.hometeam, logo: game.home_logo },
            awayTeam: { name: game.awayteam, logo: game.away_logo },
            score: game.status || "N/A",
            half: game.fixture_date,
            timestamp: game.timestamp,
            odds: [
              { label: "", value: game.home_odds },
              { label: "", value: game.draw_odds },
              { label: "", value: game.away_odds },
              { label: "+", value: 55 },
            ],
          }));
          setGameData(formattedData);
        } else {
          console.error("Failed to fetch game data");
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, []);

  useEffect(() => {
    if (!user) {
      // If there's no user, redirect to login page
      Router.push("/");
    } else {
      Router.push("/dashboard");
    }
  }, [user]); // Depend on user, rerun when user data changes

  return (
    <div>
      <Header />
      {/* <main>
        <IconScrollableArea />
        <BannerCarousel banners={banners} />
        <LiveSportsCarousel games={gameData} />
        <ImageGalleryOne />
        <ImageGalleryThree />
        <ImageGallery />
        <FooterContent />
      </main> */}{" "}
      <IconScrollableArea />
      <BannerCarousel banners={banners} onBannerClick={() => {}} />
      <main className="mb-16">
        <div className="w-full h-[100vh] mt-4">
          <iframe
            src={funModeLaunchUrl}
            title="Sports"
            className="w-full h-full rounded-lg shadow-lg border-0"
            allowFullScreen
          />
        </div>{" "}
        <FooterContent />
      </main>
      <Footer />
    </div>
  );
}
