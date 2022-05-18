import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ authRoute = false }) => {
  const { token } = useSelector((store) => store.auth);

  if (authRoute) {
    return token ? <Navigate replace={true} to={"/home"} /> : <Outlet />;
  }
  return token ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoute };
