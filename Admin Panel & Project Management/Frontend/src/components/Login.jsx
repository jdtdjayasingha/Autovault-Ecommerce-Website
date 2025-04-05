import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin@123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
    
          <div className="hidden md:flex flex-col items-center justify-center lg:ml-72">
            <img alt="Logo" src={logo} className="h-80 w-auto" />
          </div>

          <div className="bg-white p-8 rounded-lg w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
              Admin Login
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="text-gray-400 py-4 text-center bg-white shadow-inner mt-auto">
        <p>&copy; {new Date().getFullYear()} Autovault. All rights reserved.</p>
      </footer>
    </div>
  );
}
