"use client";

import { useState } from "react";
import Image from "next/image";
import { API_URL } from "../utils/config";
import { useRouter } from "next/router";

const ImageGallery = () => {
  const [iframeSrc, setIframeSrc] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 12;
  const router = useRouter();

  const getProviderUrl = (provider) => {
    switch (provider) {
      case "imoon":
        return `${API_URL}/api/imoongames`;
      case "turbo":
        return `${API_URL}/api/turbogames`;
      case "aviatrix":
        return `${API_URL}/api/aviatrixgames`;
      case "pixel":
        return `${API_URL}/api/pixelaviator`;
      case "avt":
        return `${API_URL}/api/avt`;
      case "smart":
        return `${API_URL}/api/smartgames`;
      default:
        return `${API_URL}/api/avt`;
    }
  };

  const handleClick = async (ref, action, provider) => {
    try {
      const token = localStorage.getItem("token");
      const url = getProviderUrl(provider);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ref, action, provider }),
      });

      if (response.status !== 200) {
        router.push("/login");
      } else {
        const { iframeSrc } = await response.json();
        router.push({
          pathname: "/games",
          query: { iframeSrc },
        });
      }
    } catch (error) {
      console.error("Error fetching the iframe source:", error);
    }
  };

  const images = [
    { src: "/images/jetx.webp", alt: "Jetx", ref: "jetx", provider: "smart" },
    {
      src: "/images/trix.png",
      alt: "Aviatrix",
      ref: "aviatrix",
      provider: "aviatrix",
    },
    {
      src: "/images/crash1917.jpg",
      alt: "Crash",
      ref: "1006",
      provider: "imoon",
    },
    { src: "/images/aero.webp", alt: "Aero", ref: "aero", provider: "turbo" },
    {
      src: "/images/pepeta.png",
      alt: "Pepeta",
      ref: "pepeta",
      provider: "smart",
    },
    {
      src: "/images/ballon.png",
      alt: "Ballon",
      ref: "ballon",
      provider: "smart",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1007.png",
      alt: "Dragon",
      ref: "1007",
      provider: "imoon",
    },
    {
      src: "/images/turbocrash.webp",
      alt: "Turbo Crash",
      ref: "crash",
      provider: "turbo",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1005.png",
      alt: "Witch",
      ref: "1005",
      provider: "imoon",
    },
    {
      src: "/images/royale.jpg",
      alt: "Royale",
      ref: "1001",
      provider: "imoon",
    },
    {
      src: "/images/turbolimbo.webp",
      alt: "Limbo",
      ref: "limbo",
      provider: "turbo",
    },
    {
      src: "/images/turbodogs.webp",
      alt: "Dog Street",
      ref: "dogstreet",
      provider: "turbo",
    },
    {
      src: "/images/turbofruit.webp",
      alt: "Fruit Towers",
      ref: "fruittowers",
      provider: "turbo",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1003.png",
      alt: "Blood",
      ref: "1003",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1002.png",
      alt: "Crash Two",
      ref: "1002",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/3001.png",
      alt: "Trade",
      ref: "3001",
      provider: "imoon",
    },
    {
      src: "/images/turbomines.webp",
      alt: "Turbo Mines",
      ref: "turbomines",
      provider: "turbo",
    },
    {
      src: "/images/turboplinko.webp",
      alt: "Turbo Plinko",
      ref: "turboplinko",
      provider: "turbo",
    },
    {
      src: "/images/turbohilo.webp",
      alt: "Hilo",
      ref: "hilo",
      provider: "turbo",
    },
    {
      src: "/images/turbodice.webp",
      alt: "Dice",
      ref: "dice",
      provider: "turbo",
    },
    {
      src: "/images/turbomagic.webp",
      alt: "Keno",
      ref: "keno",
      provider: "turbo",
    },
    {
      src: "/images/mines.webp",
      alt: "Mines",
      ref: "mines",
      provider: "turbo",
    },
    {
      src: "/images/ballandball.webp",
      alt: "Ball and Ball",
      ref: "ballandball",
      provider: "turbo",
    },
    {
      src: "/images/turbobayraktar.webp",
      alt: "Bayraktar",
      ref: "bayraktar",
      provider: "turbo",
    },
    {
      src: "/images/turbohamsta.webp",
      alt: "Hamsta",
      ref: "hamsta",
      provider: "turbo",
    },
    {
      src: "/images/turneko.webp",
      alt: "Neko",
      ref: "neko",
      provider: "turbo",
    },
    {
      src: "/images/turbotowers.webp",
      alt: "Towers",
      ref: "towers",
      provider: "turbo",
    },
    {
      src: "/images/turbobookofmines.webp",
      alt: "Book Of Mines",
      ref: "bookofmines",
      provider: "turbo",
    },
    {
      src: "/images/turbobubbles.webp",
      alt: "Bubbles",
      ref: "bubbles",
      provider: "turbo",
    },
    {
      src: "/images/turbodouble.webp",
      alt: "Double Roll",
      ref: "double",
      provider: "turbo",
    },
    { src: "/images/stp.webp", alt: "STP", ref: "stp", provider: "turbo" },
    {
      src: "/images/jetx3.webp",
      alt: "Jetx3",
      ref: "jetx3",
      provider: "smart",
    },
    {
      src: "/images/spinx.webp",
      alt: "Spinx",
      ref: "spinx",
      provider: "smart",
    },
    {
      src: "/images/vampires.webp",
      alt: "Vampire",
      ref: "vampires",
      provider: "smart",
    },
    { src: "/images/dark.webp", alt: "Dark", ref: "dark", provider: "smart" },
    {
      src: "/images/evolution.webp",
      alt: "Evolution",
      ref: "evolution",
      provider: "smart",
    },
    {
      src: "/images/moonstone.webp",
      alt: "Moonstone",
      ref: "moonstone",
      provider: "smart",
    },
    {
      src: "/images/vipkeno.webp",
      alt: "VipKeno",
      ref: "vipkeno",
      provider: "smart",
    },
    {
      src: "/images/plinkox.webp",
      alt: "PlinkoX",
      ref: "plinkox",
      provider: "smart",
    },
    {
      src: "/images/zombies.webp",
      alt: "Zombies",
      ref: "zoombies",
      provider: "smart",
    },
    {
      src: "/images/virtual_roullete.webp",
      alt: "Roulette",
      ref: "virtual",
      provider: "smart",
    },
    {
      src: "/images/apollo.webp",
      alt: "Apollo",
      ref: "appolo",
      provider: "smart",
    },
    {
      src: "/images/russian.webp",
      alt: "Russian",
      ref: "russiankeno",
      provider: "smart",
    },
    {
      src: "/images/samurai.webp",
      alt: "Samurai",
      ref: "samurai",
      provider: "smart",
    },
    {
      src: "/images/worldwar.webp",
      alt: "World War",
      ref: "ww2",
      provider: "smart",
    },
    {
      src: "/images/vikings.webp",
      alt: "Vikings",
      ref: "viking",
      provider: "smart",
    },
    {
      src: "/images/cricketx.webp",
      alt: "CricketX",
      ref: "cricketx",
      provider: "smart",
    },
    {
      src: "/images/wild_jungle.webp",
      alt: "Wild Jungle",
      ref: "jungle",
      provider: "smart",
    },
  ];

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <div className="text-center p-4">
      <p className="text-xl font-semibold text-gray-800 mb-4">🎮 Top Games</p>

      {/* Game Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {currentImages.map((image) => (
          <div
            key={image.ref}
            className="cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transform transition"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              className="w-full h-auto object-cover"
              onClick={() => handleClick(image.ref, "play", image.provider)}
            />
          </div>
        ))}
      </div>

      {/* Iframe if game is launched */}
      {iframeSrc && (
        <div className="mt-6">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            className="w-full h-[500px] rounded-md shadow-lg"
          />
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
