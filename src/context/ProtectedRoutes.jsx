import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";

export default function ProtectedRoutes({ children }) {
  // return user ? children : <Navigate to="/login" />;
  const { user } = useContext(GlobalContext); // Login holatini olish
  const token = localStorage.getItem("authToken");
  if (token || user) {

    return children;
  }
  else {
    return <Navigate to="/login" />;
  }

  // return isAuthenticated ? children : <Navigate to="/login" />;
}
