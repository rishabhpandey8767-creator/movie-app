// src/pages/MyList.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import MovieCard from "../components/movies/MovieCard.jsx";

function MyList() {
  const { myList } = useContext(AuthContext);

  if (!myList || myList.length === 0) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center text-white text-center p-4">
        No movies in your list.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8 pt-24">
      <h1 className="text-white text-3xl font-bold mb-6">My List</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {myList.map((movie) => (
          <MovieCard
            key={movie.imdbID || movie.id}
            movie={movie}
            isInMyListPage={true} // flag to show remove button by default
          />
        ))}
      </div>
    </div>
  );
}

export default MyList;
