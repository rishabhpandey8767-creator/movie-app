// src/components/layout/Header.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 flex justify-between items-center px-6 py-4">
      
      {/* Logo */}
      <Link to="/" className="text-red-600 font-bold text-3xl cursor-pointer">
        MOVIE-HUB
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 text-white font-medium text-lg">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/series">Series</Link>
        {user && <Link to="/my-list">My List</Link>}
      </nav>

      {/* Right Side */}
      <div className="hidden md:flex gap-4 items-center">
        {!user ? (
          <Link
            to="/login"
            className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700"
          >
            Sign In
          </Link>
        ) : (
          <>
            <span className="text-white font-medium">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="absolute top-16 right-4 bg-black p-4 rounded-md shadow-lg flex flex-col gap-4 text-white md:hidden">
          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/movies" onClick={() => setMobileMenu(false)}>Movies</Link>
          <Link to="/series" onClick={() => setMobileMenu(false)}>Series</Link>
          {user && (
            <Link to="/my-list" onClick={() => setMobileMenu(false)}>My List</Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-red-600 px-4 py-1 rounded text-center"
              onClick={() => setMobileMenu(false)}
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                setMobileMenu(false);
              }}
              className="bg-red-600 px-4 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
