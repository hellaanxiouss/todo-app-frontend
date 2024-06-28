import React from "react";
import { Navigate } from "react-router-dom";

const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};

const PrivateRoute = ({ children }) => {
  const authToken = getLocalStorageItem("authToken");
  if (!authToken) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
