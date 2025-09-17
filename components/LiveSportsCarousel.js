import React, { useRef } from "react";
import Slider from "react-slick";
import LiveSports from "./liveSports";
import { useRouter } from "next/router";
import { API_URL } from "../utils/config";

const LiveSportsCarousel = ({ games }) => {
  const sliderRef = useRef(null);
  const router = useRouter();
  const isUserInteracting = useRef(false);

  const handleClick = async (ref, action, provider) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${API_URL}/api/sport_games`;

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
      console.error("Error submitting to sport_games API:", error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipe: true,
    beforeChange: () => {
      if (isUserInteracting.current) {
        sliderRef.current.slickPause();
      }
    },
    onSwipe: () => {
      isUserInteracting.current = true;
      sliderRef.current.slickPause();
    },
    onEdge: () => {
      isUserInteracting.current = true;
      sliderRef.current.slickPause();
    },
    afterChange: () => {
      if (!isUserInteracting.current) {
        sliderRef.current.slickPlay();
      }
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Sports</h2>
      <Slider ref={sliderRef} {...settings}>
        {games.map((game, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(game.ref, "view", game.provider);
            }}
            className="px-2"
          >
            <div className="bg-[#0a1a2f] rounded-lg shadow-md overflow-hidden">
              <LiveSports {...game} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LiveSportsCarousel;
