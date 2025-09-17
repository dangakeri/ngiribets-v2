import React, { useState } from "react";

const LiveSports = ({ league, homeTeam, awayTeam, score, half, odds }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  // Helper function to truncate long names
  const truncateName = (name) => {
    return name.length > 25 ? name.substring(0, 25) + "..." : name;
  };

  // Check if the data is available
  const isLoading = !league || !homeTeam || !awayTeam || !odds || !half;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-300">
        <div className="w-32 h-2 bg-gray-700 animate-pulse rounded"></div>
        <p className="mt-3 text-sm">Loading game details...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a1a2f] rounded-xl shadow-md p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-300 text-sm font-medium">{league}</span>
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          Highlights
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        {/* Home */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src={homeTeam.logo}
            alt={`${homeTeam.name} logo`}
            className="w-10 h-10 object-contain mb-1"
          />
          <span className="text-sm text-gray-200 text-center">
            {truncateName(homeTeam.name)}
          </span>
        </div>

        {/* VS / Score */}
        <div className="text-center w-1/3">
          <span className="text-lg font-bold text-white">VS</span>
          {score && (
            <div className="text-xl font-semibold text-green-400">{score}</div>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center w-1/3">
          <img
            src={awayTeam.logo}
            alt={`${awayTeam.name} logo`}
            className="w-10 h-10 object-contain mb-1"
          />
          <span className="text-sm text-gray-200 text-center">
            {truncateName(awayTeam.name)}
          </span>
        </div>
      </div>

      {/* Half / Time */}
      <div className="text-center text-xs text-gray-400 mb-3">
        {new Date(half).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>

      {/* Odds */}
      <div className="flex flex-wrap gap-2 justify-center">
        {odds.map((odd, index) => (
          <button
            key={index}
            onClick={() => setClickedIndex(index)}
            className={`px-4 py-2 rounded text-sm font-medium transition ${
              clickedIndex === index
                ? "bg-orange-500 text-white"
                : "bg-[#092b42] text-white hover:bg-[#123c5c]"
            } ${odd.value > 50 ? "text-green-400" : ""}`}
          >
            {`${odd.label} ${odd.value}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiveSports;
