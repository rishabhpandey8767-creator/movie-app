// src/hooks/useFetchMovies.js
import { useState, useEffect } from "react";
import { searchMovies } from "../api/movieApi";

export default function useFetchMovies(query = "avengers") {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await searchMovies(query);
        setMovies(data || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  return { movies, loading };
}
