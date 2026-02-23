// src/pages/Signup.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === formData.email)) {
      alert("Email already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    login(formData); // auto-login
    navigate("/");   // redirect to Home
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md text-white space-y-4">
        <h2 className="text-3xl font-bold text-red-600 text-center">Sign Up</h2>

        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 rounded bg-gray-800 focus:outline-none" required />

        <button className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700">Sign Up</button>

        <p className="text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-red-600 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
