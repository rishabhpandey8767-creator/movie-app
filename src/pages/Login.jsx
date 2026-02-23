// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    login(user);     // set user in AuthContext
    navigate("/");   // redirect to Home
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md text-white space-y-4">
        <h2 className="text-3xl font-bold text-red-600 text-center">Sign In</h2>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />

        <button className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700">Sign In</button>

        <p className="text-center text-gray-400">
          Don't have an account? <Link to="/signup" className="text-red-600 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
