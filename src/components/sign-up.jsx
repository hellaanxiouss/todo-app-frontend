import React from "react";
import { useForm } from "react-hook-form";
import banner from "../assets/banner.png";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/user-api"; // Assuming the function name is createUser now

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("dataasdasdasdas", data);
    try {
      await createUser(data);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      // You can handle error state here, e.g., show a message to the user
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen w-screen gap-24 text-black">
      <div className="flex justify-center h-full w-full md:w-fit p-3 pr-0">
        <img src={banner} alt="Organic Mind" className="rounded-xl" />
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2 p-8">
        <h2 className="text-4xl font-bold mb-6">Sign up</h2>
        <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="">
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone_number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
              />
              {errors.phone_number && (
                <span className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              placeholder="***********"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-yellow-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a3 3 0 01-5.9 1H5a3 3 0 01-3-3v-2a3 3 0 013-3h6.1a3 3 0 010 6zM4 6a1 1 0 000 2h4a1 1 0 000-2H4zm1 8a1 1 0 100 2h8a1 1 0 100-2H5zm10-3a1 1 0 100 2h2a1 1 0 100-2h-2zm-1 4a1 1 0 100 2h3a1 1 0 100-2h-3zm-6-4a1 1 0 100 2h3a1 1 0 100-2H8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg w-full mb-4 focus:outline-none focus:shadow-outline">
            Sign up
          </button>
          <div className="flex items-center justify-between mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex justify-between mb-6">
            <button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg w-5/12 focus:outline-none focus:shadow-outline">
              Google
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg w-5/12 focus:outline-none focus:shadow-outline">
              Facebook
            </button>
          </div>
        </form>
        <p className="text-gray-500">
          Already have an account?&nbsp;
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
