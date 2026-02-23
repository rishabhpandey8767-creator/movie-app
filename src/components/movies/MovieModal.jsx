// src/components/movies/MovieModal.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { getMovieById } from "../../api/movieApi";
import { AuthContext } from "../../context/AuthContext.jsx";

function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const iframeRef = useRef(null);
  const { user, myList, addToMyList, removeFromMyList } = useContext(AuthContext);

  // Fetch movie details by IMDB ID
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(movieId);
      setMovie(data);
    };
    fetchMovie();
  }, [movieId]);

  // Stop trailer when modal closes
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = "";
      }
    };
  }, []);

  if (!movie) return null;

  const trailerUrl = `https://www.youtube.com/embed/rv6JejL2D6A?autoplay=1&mute=1`;

  // Check if movie is in My List
  const isInMyList = myList.some(m => m.imdbID === movie.imdbID);

  const handleListToggle = () => {
    if (!user) {
      alert("Please login to add/remove from My List.");
      return;
    }
    if (isInMyList) {
      removeFromMyList(movie.imdbID);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-11/12 max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-red-600"
        >
          ×
        </button>

        {/* Movie Content */}
        <div className="flex flex-col md:flex-row gap-6 text-white">
          {/* Poster */}
          <img
            src={movie.Poster || "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            className="w-full md:w-1/3 lg:w-1/4 rounded-lg shadow-lg"
          />

          {/* Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{movie.Title}</h1>
            <p className="text-gray-300">{movie.Plot}</p>
            <p className="text-gray-400">Released: {movie.Released}</p>
            <p className="text-gray-400">Genre: {movie.Genre}</p>
            <p className="text-gray-400">IMDB Rating: {movie.imdbRating}</p>

            {/* Trailer */}
            <div className="mt-4 w-full h-48 md:h-64 lg:h-96">
              <iframe
                ref={iframeRef}
                className="w-full h-full rounded-lg"
                src={trailerUrl}
                title="Movie Trailer"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </div>

            {/* Watch + My List Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-red-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700">
                ▶ Watch Now
              </button>
              {user && (
                <button
                  onClick={handleListToggle}
                  className={`px-6 py-3 rounded-md text-lg font-semibold ${
                    isInMyList ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isInMyList ? "Remove from My List" : "Add to My List"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
