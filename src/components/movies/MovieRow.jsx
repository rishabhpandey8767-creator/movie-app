import React, { useRef } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    const { current } = rowRef;
    if (direction === "left") {
      current.scrollBy({ left: -500, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 md:px-10 py-6 relative group">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">{title}</h2>

      {/* Left Arrow */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center"
        onClick={() => scroll("left")}
      >
        ◀
      </button>

      {/* Movies Row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
      >
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="text-gray-400">No movies found</p>
        )}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center"
        onClick={() => scroll("right")}
      >
        ▶
      </button>
    </div>
  );
}

export default MovieRow;
