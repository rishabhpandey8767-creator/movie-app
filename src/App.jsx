import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Series from "./pages/Series.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyList from "./pages/MyList.jsx";
import Header from "./components/layout/Header.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
        <Route path="/series" element={<PrivateRoute><Series /></PrivateRoute>} />
        <Route path="/my-list" element={<PrivateRoute><MyList /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
