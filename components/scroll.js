import { useRouter } from "next/router";
import { API_URL } from "../utils/config";
import Image from "next/image";

const icons = [
  {
    type: "image",
    src: "/images/football.svg",
    name: "Sports",
    path: "/dashboard",
    // actionData: { ref: "sports", action: "play", provider: "sports" },
  },
  {
    type: "image",
    src: "/images/aviator.png",
    name: "Aviator",
    path: "/api/avt",
    actionData: { ref: "aviator", action: "play", provider: "avt" },
  },
  { type: "image", src: "/images/top.svg", name: "Top Games", path: "/top" },
  { type: "image", src: "/images/imoon.svg", name: "Crash", path: "/crash" },
  {
    type: "image",
    src: "/images/virtual.png",
    name: "Hot Games",
    // path: "/games",
    path: "/casino",
    // actionData: { ref: "sports", action: "play", provider: "sports" },
  },
  // {
  //   type: "image",
  //   src: "/images/providers.svg",
  //   name: "Providers",
  //   path: "/dashboard",
  // },
];

const IconScrollableArea = () => {
  const router = useRouter();
  const handleClick = async (item) => {
    try {
      if (item.name === "Aviator") {
        // Special case for Aviator
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/avt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item.actionData),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const { iframeSrc } = await response.json();

        router.push({
          pathname: "/games",
          query: { iframeSrc },
        });
      } else if (item.actionData) {
        // Default flow for other API-driven icons
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/sport_games`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item.actionData),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const { iframeSrc } = await response.json();

        router.push({
          pathname: "/games",
          query: { iframeSrc },
        });
      } else {
        // Normal navigation
        router.push(item.path);
      }
    } catch (error) {
      console.error("Error fetching the iframe source:", error);
    }
  };

  return (
    <div className=" bg-[#092335] mt-4 py-2 overflow-x-auto no-scrollbar">
      {/* 👇 gap-3 adds spacing between buttons */}
      <div className="flex min-w-max gap-3 px-3">
        {icons.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 whitespace-nowrap shadow-sm
                ${
                  isActive
                    ? "bg-[#a21cf0] text-white shadow-md scale-105"
                    : "bg-[#303d4a] text-white hover:bg-[#a21cf0]/70"
                }`}
            >
              <Image
                src={item.src}
                alt={item.name}
                width={20}
                height={20}
                className="object-contain w-5 h-5"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IconScrollableArea;
