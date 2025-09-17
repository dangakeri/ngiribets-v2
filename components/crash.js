// import { useState } from "react";
// import Image from "next/image";
// import { API_URL } from "../utils/config";
// import { useRouter } from "next/router";

// const ImageGallery = () => {
//   const [iframeSrc, setIframeSrc] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const imagesPerPage = 30;
//   const router = useRouter();

//   const getProviderUrl = (provider) => {
//     switch (provider) {
//       case "imoon":
//         return `${API_URL}/api/imoongames`;
//       case "turbo":
//         return `${API_URL}/api/turbogames`;
//       case "aviatrix":
//         return `${API_URL}/api/aviatrixgames`;
//       case "pixel":
//         return `${API_URL}/api/pixelaviator`;
//       case "avt":
//         return `${API_URL}/api/avt`;
//       case "smart":
//         return `${API_URL}/api/smartgames`;
//       default:
//         return `${API_URL}/api/avt`;
//     }
//   };

//   const handleClick = async (ref, action, provider) => {
//     try {
//       const token = localStorage.getItem("token");
//       const url = getProviderUrl(provider);
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ref, action, provider }),
//       });

//       if (response.status !== 200) {
//         router.push("/login");
//       } else {
//         const { iframeSrc } = await response.json();
//         router.push({
//           pathname: "/games",
//           query: { iframeSrc },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching the iframe source:", error);
//     }
//   };

//   const images = [
//     { src: "/images/jetx.webp", alt: "Jetx", ref: "jetx", provider: "smart" },
//     {
//       src: "/images/trix.png",
//       alt: "Aviatrix",
//       ref: "aviatrix",
//       provider: "aviatrix",
//     },
//     {
//       src: "/images/avtwin.avif",
//       alt: "Aviator",
//       ref: "aviator",
//       provider: "avt",
//     },
//     {
//       src: "/images/aerofine.jpg",
//       alt: "Aero",
//       ref: "aero",
//       provider: "turbo",
//     },
//     {
//       src: "/images/turbocrash.webp",
//       alt: "Turbo Crash",
//       ref: "crash",
//       provider: "turbo",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1007.png",
//       alt: "Dragon",
//       ref: "1007",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1006.png",
//       alt: "Crash",
//       ref: "1006",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1005.png",
//       alt: "Witch",
//       ref: "1005",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1004.png",
//       alt: "Ghost",
//       ref: "1004",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1003.png",
//       alt: "Blood",
//       ref: "1003",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/3001.png",
//       alt: "Trade",
//       ref: "3001",
//       provider: "imoon",
//     },
//     {
//       src: "https://cdn.betfounders.com/imoon/1001.png",
//       alt: "Royale",
//       ref: "1001",
//       provider: "imoon",
//     },
//   ];

//   const totalPages = Math.ceil(images.length / imagesPerPage);
//   const currentImages = images.slice(
//     currentPage * imagesPerPage,
//     (currentPage + 1) * imagesPerPage
//   );

//   return (
//     <div className="text-center p-6">
//       {/* Image Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
//         {currentImages.map((image) => (
//           <div
//             key={image.ref}
//             className="cursor-pointer transform transition hover:scale-105"
//             onClick={() => handleClick(image.ref, "play", image.provider)}
//           >
//             <Image
//               src={image.src}
//               alt={image.alt}
//               width={120}
//               height={120}
//               className="rounded-md shadow-md object-cover"
//             />
//             <p className="mt-1 text-xs text-gray-600">{image.alt}</p>
//           </div>
//         ))}
//       </div>

//       {/* Iframe Preview */}
//       {iframeSrc && (
//         <div className="mt-6">
//           <iframe
//             src={iframeSrc}
//             frameBorder="0"
//             width="100%"
//             height="500px"
//             className="rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-3 mt-6">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//           disabled={currentPage === 0}
//           className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <div className="flex items-center gap-2">
//           {currentPage > 0 && (
//             <button
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-2 py-1 bg-gray-100 rounded"
//             >
//               {currentPage}
//             </button>
//           )}
//           <button className="px-2 py-1 bg-yellow-400 text-white rounded font-semibold">
//             {currentPage + 1}
//           </button>
//           {currentPage < totalPages - 1 && (
//             <button
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-2 py-1 bg-gray-100 rounded"
//             >
//               {currentPage + 2}
//             </button>
//           )}
//         </div>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
//           }
//           disabled={currentPage === totalPages - 1}
//           className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;
"use client";

import { useState } from "react";
import Image from "next/image";
import { API_URL } from "../utils/config";
import { useRouter } from "next/navigation"; // ✅ App Router

const ImageGallery = () => {
  const [iframeSrc, setIframeSrc] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // start with 12
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
        setIframeSrc(iframeSrc); // ✅ show inline preview instead of redirecting
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
      src: "/images/avtwin.avif",
      alt: "Aviator",
      ref: "aviator",
      provider: "avt",
    },
    {
      src: "/images/aerofine.jpg",
      alt: "Aero",
      ref: "aero",
      provider: "turbo",
    },
    {
      src: "/images/turbocrash.webp",
      alt: "Turbo Crash",
      ref: "crash",
      provider: "turbo",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1007.png",
      alt: "Dragon",
      ref: "1007",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1006.png",
      alt: "Crash",
      ref: "1006",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1005.png",
      alt: "Witch",
      ref: "1005",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1004.png",
      alt: "Ghost",
      ref: "1004",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1003.png",
      alt: "Blood",
      ref: "1003",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/3001.png",
      alt: "Trade",
      ref: "3001",
      provider: "imoon",
    },
    {
      src: "https://cdn.betfounders.com/imoon/1001.png",
      alt: "Royale",
      ref: "1001",
      provider: "imoon",
    },
  ];

  const currentImages = images.slice(0, visibleCount);

  return (
    <div className="text-center pt-2">
      {/* Image Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 p-4">
        {currentImages.map((image, index) => (
          <div
            key={`${image.ref}-${index}`}
            className="cursor-pointer  rounded-lg overflow-hidden transition"
            onClick={() => handleClick(image.ref, "play", image.provider)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={100}
              height={100}
              className="w-full aspect-square object-center"
            />
          </div>
        ))}
      </div>

      {/* Iframe Preview */}
      {iframeSrc && (
        <div className="mt-6">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            width="100%"
            height="500px"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < images.length && (
        <div className="mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + imagesPerPage)}
            className="px-6 py-2 bg-[#a21cf0] text-white rounded-lg font-medium hover:bg-[#9015d6] transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
