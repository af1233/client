import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../redux/store";
// import useAuth from "./useAuth"; // Import your authentication hook

const ProtectedRoute = ({ children, ...rest }) => {
  const { isloggedIn } = useAuth(); // Assuming you have an authentication hook

  if (!isloggedIn) return <Navigate to="/login" />;

  return <>{children}</>;
 
};

export default ProtectedRoute;
