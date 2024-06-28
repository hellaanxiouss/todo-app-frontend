import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center h-screen gap-24 text-black">
      <div className="w-full md:w-fit p-3 flex justify-center h-full">
        <img src={banner} alt="Organic Mind" className="rounded-xl" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Productive Mind</h1>
        <p className="text-lg mb-6">
          With only the features you need, Organic Mind is customized for
          individuals seeking a stress-free way to stay focused on their goals,
          projects, and tasks.
        </p>
        <button onClick={() => navigate("/signup")} className="bg-yellow-500 hover:bg-yellow-600 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-11/12">
          Get Started
        </button>
        <div className="flex justify-center">
          <p className="mt-4">
            Already have an account?&nbsp;
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;