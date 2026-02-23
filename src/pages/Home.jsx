import React from "react";
import HeroBanner from "../components/layout/HeroBanner";
import MovieRow from "../components/movies/MovieRow";
import useFetchMovies from "../hooks/useFetchMovies.js"; // ✅ default import


function Home() {
  const { movies: trendingMovies, loading } = useFetchMovies("avengers");
  const { movies: topRatedMovies } = useFetchMovies("batman");

  return (
    <div className="pt-24">
      <HeroBanner />

      {loading ? (
        <p className="text-white px-10 py-6">Loading...</p>
      ) : (
        <>
          <MovieRow title="🔥 Trending Now" movies={trendingMovies} />
          <MovieRow title="⭐ Top Rated" movies={topRatedMovies} />
        </>
      )}
    </div>
  );
}

export default Home;
