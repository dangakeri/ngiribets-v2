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
    { src: "/images/jetx.webp", alt: "Jetx", ref: "jetx", provider: "smart" },
    {
      src: "/images/trix.png",
      alt: "Aviatrix",
      ref: "aviatrix",
      provider: "aviatrix",
    },
    {
      src: "/images/ballon.png",
      alt: "Ballon",
      ref: "ballon",
      provider: "smart",
    },
    {
      src: "/images/aerofine.jpg",
      alt: "Aero",
      ref: "aero",
      provider: "turbo",
    },
    { src: "/images/1006.png", alt: "Crash", ref: "1006", provider: "imoon" },
    {
      src: "/images/pepeta.webp",
      alt: "Pepeta",
      ref: "pepeta",
      provider: "smart",
    },
    { src: "/images/1007.png", alt: "Dragon", ref: "1007", provider: "imoon" },
    { src: "/images/1005.png", alt: "Witch", ref: "1005", provider: "imoon" },
    { src: "/images/1001.png", alt: "Royale", ref: "1001", provider: "imoon" },
  ];

  return (
    <div className="text-center py-6">
      <p className="text-lg font-semibold mb-4">Top Games</p>

      {/* Grid of images */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-center">
        {images.map((image) => (
          <div
            key={image.ref}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={image.src}
              alt={image.alt}
              onClick={() => handleClick(image.ref, "play", image.provider)}
              width={100}
              height={100}
              className="rounded-md shadow-md object-cover"
            />
          </div>
        ))}
      </div>

      {/* Iframe preview */}
      {iframeSrc && (
        <div className="mt-6 w-full">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            width="100%"
            height="500px"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
