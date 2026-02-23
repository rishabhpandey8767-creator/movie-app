// src/pages/Series.jsx
import React, { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies.js";
import MovieCard from "../components/movies/MovieCard.jsx";

function Series() {
  const [query, setQuery] = useState("series");
  const { movies, loading } = useFetchMovies(query);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
  };

  return (
    <div className="bg-black min-h-screen pt-28 px-4 md:px-8">
      {/* Title */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        Series
      </h1>

      {/* Centered Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-6"
      >
        <input
          type="text"
          name="search"
          placeholder="Search series..."
          className="w-full max-w-md p-3 rounded-l bg-gray-800 text-white focus:outline-none"
        />
        <button className="bg-red-600 px-4 rounded-r hover:bg-red-700 text-white font-semibold">
          Search
        </button>
      </form>

      {/* Series Grid */}
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No series found.</p>
      )}
    </div>
  );
}

export default Series;
