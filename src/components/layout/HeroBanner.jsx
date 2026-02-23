import React from "react";

function HeroBanner() {
  // Demo movie data
  const movie = {
    title: "Avengers: Endgame",
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. The remaining Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    backdrop_path:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4", // placeholder
  };

  return (
    <section className="relative h-[80vh] w-full">
      {/* Background Image */}
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="w-full h-full object-cover opacity-40"
      />

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-10 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">{movie.title}</h1>
        <p className="text-sm md:text-lg max-w-2xl opacity-90">{movie.overview}</p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-300">
            ▶ Play
          </button>
          <button className="bg-gray-700 bg-opacity-60 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-600">
            ℹ More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
