import api from "./axiosInstance";

const API_KEY = "7ad31184";

// Search movies by keyword
export const searchMovies = async (query) => {
  try {
    const response = await api.get(`?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Get single movie by IMDB ID
export const getMovieById = async (id) => {
  try {
    const response = await api.get(`?apikey=${API_KEY}&i=${id}&plot=full`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
};
