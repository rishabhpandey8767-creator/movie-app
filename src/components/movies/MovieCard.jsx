
import React, { useState, useContext } from "react";
import MovieModal from "./MovieModal";
import { AuthContext } from "../../context/AuthContext.jsx";

function MovieCard({ movie, isInMyListPage = false }) {
  const [openModal, setOpenModal] = useState(false);
  const { myList, addToMyList, removeFromMyList } = useContext(AuthContext);

  const isInMyList = isInMyListPage || myList.some(m => m.id === movie.imdbID);

  const handleMyList = (e) => {
    e.stopPropagation();
    if (isInMyList) {
      removeFromMyList(movie.imdbID);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="w-40 sm:w-48 md:w-52 lg:w-56 flex-shrink-0 rounded-md overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300 relative"
      >
        <img
          src={movie.Poster || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
          className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover"
        />

        <h3 className="text-white mt-2 text-sm sm:text-base font-medium truncate">{movie.Title}</h3>
        <p className="text-gray-300 text-xs">{movie.Year}</p>

        <button
          onClick={handleMyList}
          className={`absolute top-2 right-2 px-2 py-1 rounded text-sm font-semibold ${
            isInMyList ? "bg-red-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isInMyList ? "Remove" : "Add"}
        </button>
      </div>

      {openModal && (
        <MovieModal movieId={movie.imdbID} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}

export default MovieCard;
