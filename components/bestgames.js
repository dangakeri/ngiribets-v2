"use client";

import { useState } from "react";
import Image from "next/image";
import { API_URL } from "../utils/config";
import { useRouter } from "next/router";

const ImageGallery = () => {
  const [iframeSrc, setIframeSrc] = useState(null);
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
      case "sports":
        return `${API_URL}/api/sport_games`;
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
    {
      src: "/images/avtwin.avif",
      alt: "Aviator",
      ref: "aviator",
      provider: "avt",
    },
    {
      src: "/images/spt.avif",
      alt: "Sports",
      ref: "sports",
      provider: "sports",
    },
  ];

  return (
    <div className="text-center py-6">
      {/* Title */}
      <p className="text-lg font-semibold mb-4 text-[#F5911E]">🔥 Hot Games</p>

      {/* Image Grid */}
      <div className="flex justify-center gap-6 flex-wrap">
        {images.map((image) => (
          <div
            key={image.ref}
            className="w-28 h-28 sm:w-32 sm:h-32 cursor-pointer rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition duration-300"
            onClick={() => handleClick(image.ref, "play", image.provider)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Game Iframe */}
      {iframeSrc && (
        <div className="mt-6 w-full max-w-4xl mx-auto">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            className="w-full h-[500px] rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
