// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState([]);

  // Load user and My List from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setMyList(storedUser.myList || []);
    }
  }, []);

  const login = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find(u => u.email === userData.email);

    if (currentUser) {
      setUser(currentUser);
      setMyList(currentUser.myList || []);
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  };

  const logout = () => {
    setUser(null);
    setMyList([]);
    localStorage.removeItem("user");
  };

  const addToMyList = (movie) => {
    const movieId = movie.id || movie.imdbID;

    if (!myList.find(m => m.id === movieId)) {
      const newMovie = { ...movie, id: movieId };
      const updatedList = [...myList, newMovie];
      setMyList(updatedList);

      const updatedUser = { ...user, myList: updatedList };
      setUser(updatedUser);

      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const usersUpdated = storedUsers.map(u =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(usersUpdated));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const removeFromMyList = (movieId) => {
    const updatedList = myList.filter(m => m.id !== movieId);
    setMyList(updatedList);

    const updatedUser = { ...user, myList: updatedList };
    setUser(updatedUser);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const usersUpdated = storedUsers.map(u =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(usersUpdated));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, myList, addToMyList, removeFromMyList }}>
      {children}
    </AuthContext.Provider>
  );
};
