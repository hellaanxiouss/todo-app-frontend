import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";
import { authenticateUser } from "../services/user-api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authenticateUser(email, password);

      if (!result) {
        throw new Error("Authentication failed");
      }

      // Handle successful authentication
      // console.log("Authentication successful:", result);

      // Save the token to localStorage
      localStorage.setItem("authToken", result.authToken);
      // console.log("Token saved to local storage successfully");

      // Navigate to home page on successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during authentication:", error.message);
      setError("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen w-screen gap-3 lg:gap-24 text-black">
      <div className="flex justify-center h-full w-full md:w-fit p-3 pr-0">
        <img src={banner} alt="Organic Mind" className="rounded-xl" />
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2 p-0 lg:p-4">
        <h2 className="text-4xl font-bold mb-6">Sign in</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg w-full mb-4 focus:outline-none focus:shadow-outline"
          >
            Sign in
          </button>
        </form>
        <p className="text-gray-500">
          Don’t have an account?&nbsp;
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
