// src/pages/Movies.jsx
import React, { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies.js";
import MovieCard from "../components/movies/MovieCard.jsx";

function Movies() {
  const [query, setQuery] = useState("avengers"); // default query
  const { movies, loading } = useFetchMovies(query);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    if (searchValue) {
      setQuery(searchValue);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-28 px-4 md:px-8">
      {/* Title */}
      <div className="w-full flex justify-center md:justify-start mb-6">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          Movies
        </h1>
      </div>

      {/* Centered Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8"
      >
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className="w-full max-w-md p-3 rounded-l bg-gray-800 text-white focus:outline-none"
        />
        <button className="bg-red-600 px-4 rounded-r hover:bg-red-700 text-white font-semibold">
          Search
        </button>
      </form>

      {/* Movies Grid */}
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No movies found.</p>
      )}
    </div>
  );
}

export default Movies;
