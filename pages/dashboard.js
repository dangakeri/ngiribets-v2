// import { useEffect, useState } from "react";
// import Router from "next/router";
// import Head from "next/head";
// import Header from "../components/authenticated";
// import Footer from "../components/footer";
// import BannerCarousel from "../components/banners";
// import IconScrollableArea from "../components/scroll";
// import ImageGallery from "../components/games";
// import UserLinkModal from "../components/linkModal";
// import FooterContent from "../components/footerContent";
// import { useUser } from "../contexts/UserContext";
// import LiveSportsCarousel from "../components/LiveSportsCarousel";
// import ImageGalleryOne from "../components/bestgames";
// import ImageGalleryThree from "../components/topgames";
// import { API_URL } from "../utils/config";

// export default function Dashboard() {
//   const { user } = useUser();
//   const [showModal, setShowModal] = useState(false);
//   const [clickedBanner, setClickedBanner] = useState(null);
//   const [showPopup, setShowPopup] = useState(true);
//   const [gameData, setGameData] = useState([]);

//   useEffect(() => {
//     const fetchGameData = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/odds/fetch`);
//         if (response.ok) {
//           const data = await response.json();
//           const formattedData = data.map((game) => ({
//             league: `${game.country} ${game.league}`,
//             homeTeam: { name: game.hometeam, logo: game.home_logo },
//             awayTeam: { name: game.awayteam, logo: game.away_logo },
//             score: game.status || "N/A",
//             half: game.fixture_date,
//             timestamp: game.timestamp,
//             odds: [
//               { label: "", value: game.home_odds },
//               { label: "", value: game.draw_odds },
//               { label: "", value: game.away_odds },
//               { label: "+", value: 55 },
//             ],
//           }));
//           setGameData(formattedData);
//         } else {
//           console.error("Failed to fetch game data");
//         }
//       } catch (error) {
//         console.error("Error fetching game data:", error);
//       }
//     };

//     fetchGameData();
//   }, []);

//   useEffect(() => {
//     // Uncomment below if you want to redirect unauthenticated users
//     // if (!user) {
//     //   Router.push('/login');
//     // }
//   }, [user]);

//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   const handleBannerClick = (banner) => {
//     setClickedBanner(banner);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setClickedBanner(null);
//   };

//   const handleClickOutside = (e) => {
//     if (e.target.classList.contains("modalOverlay")) {
//       handleModalClose();
//     }
//   };

//   useEffect(() => {
//     if (showModal) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showModal]);

//   const banners = [
//     { image: "/images/aero.avif", alt: "Banner 1" },
//     { image: "/images/refer.avif", alt: "Banner 2" },
//     { image: "/images/aviatrix.avif", alt: "Banner 3" },
//     { image: "/images/royale.avif", alt: "Banner 4" },
//     { image: "/images/rains.avif", alt: "Banner 5" },
//   ];

//   return (
//     <div>
//       <Head>
//         <title>NgiriBets</title> {/* Page title here */}
//         <meta
//           name="description"
//           content="NgiriBets.Sign up today! Bet kama Ngiri!"
//         />
//       </Head>

//       <Header />
//       <main>
//         <IconScrollableArea />
//         <BannerCarousel banners={banners} onBannerClick={handleBannerClick} />
//         <LiveSportsCarousel games={gameData} />
//         <ImageGalleryOne />
//         <ImageGallery />

//         {showModal && (
//           <UserLinkModal
//             isOpen={showModal}
//             onClose={handleModalClose}
//             userLink={clickedBanner?.userLink}
//           />
//         )}

//         <FooterContent />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/authenticated";
import Footer from "../components/footer";
import BannerCarousel from "../components/banners";
import IconScrollableArea from "../components/scroll";
import FooterContent from "../components/footerContent";
import { useUser } from "../contexts/UserContext";
import { API_URL } from "../utils/config";

export default function Dashboard() {
  const { user } = useUser();
  const [iframeSrc, setIframeSrc] = useState(null);

  // ✅ Function to get provider URL
  const getProviderUrl = (provider) => {
    if (provider === "sports") return `${API_URL}/api/sport_games`;
    return `${API_URL}/api/${provider}`;
  };

  // ✅ Launch Sports on load and embed iframe
  const launchSports = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const url = getProviderUrl("sports");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ref: "sports",
          action: "play",
          provider: "sports",
        }),
      });

      if (!response.ok) {
        window.location.href = "/login";
        return;
      }

      const { iframeSrc } = await response.json();
      setIframeSrc(iframeSrc); // 👈 Embed the iframe directly on Dashboard
    } catch (error) {
      console.error("Error launching sports iframe:", error);
    }
  };

  useEffect(() => {
    launchSports();
  }, []);

  const banners = [
    { image: "/images/aero.avif", alt: "Banner 1" },
    { image: "/images/refer.avif", alt: "Banner 2" },
    { image: "/images/aviatrix.avif", alt: "Banner 3" },
    { image: "/images/royale.avif", alt: "Banner 4" },
    { image: "/images/rains.avif", alt: "Banner 5" },
  ];

  return (
    <div>
      <Head>
        <title>NgiriBets</title>
        <meta
          name="description"
          content="NgiriBets. Sign up today! Bet kama Ngiri!"
        />
      </Head>

      <Header />

      <main className="mb-16">
        {/* 👇 Navigation + Banners still appear */}
        <IconScrollableArea />
        <BannerCarousel banners={banners} onBannerClick={() => {}} />

        {/* 👇 Sports iframe directly inside dashboard */}
        {iframeSrc ? (
          <div className="w-full h-[80vh] mt-4">
            <iframe
              src={iframeSrc}
              title="Sports"
              className="w-full h-full rounded-lg shadow-lg border-0"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-center mt-6 text-gray-400">Loading Sports...</p>
        )}

        <FooterContent />
      </main>

      <Footer />
    </div>
  );
}
