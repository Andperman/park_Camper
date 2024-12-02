
import React from "react";
import { Navigate } from "react-router-dom";
// import RoleManager from "./roleManager";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div><span>Unauthorized</span></div>;
  }

  return children;
};

export default ProtectedRoutes;
