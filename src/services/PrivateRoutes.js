import React from "react";
import { Navigate } from "react-router-dom";
import PreLoader from "../utils/PreLoader";

export const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return (
      <>
        <PreLoader />
        <Navigate to="/signin" replace />
      </>
    );
  }
  return children;
};

export const ProtectedAuth = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return children;
  }
  return (
    <>
      <PreLoader />
      <Navigate to="/profile" replace />
    </>
  );
};
