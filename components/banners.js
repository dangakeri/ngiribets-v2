"use client";

import { Carousel } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImGit } from "react-icons/im";

const BannerCarousel = ({ banners, onBannerClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Group banners into pairs for desktop only
  const groupedBanners = [];
  if (isMobile) {
    // mobile → 1 per slide
    banners.forEach((b) => groupedBanners.push([b]));
  } else {
    // desktop → 2 per slide
    for (let i = 0; i < banners.length; i += 2) {
      groupedBanners.push(banners.slice(i, i + 2));
    }
  }

  return (
    <div className="w-full mx-auto px-3 mt-2">
      <Carousel autoplay dots infinite>
        {groupedBanners.map((group, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.map((banner, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer rounded-xl overflow-hidden transition duration-300"
                  onClick={() => onBannerClick(banner)}
                >
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    width={1200}
                    height={144}
                    className="w-full h-36 object-fill"
                    priority={index === 0 && i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
