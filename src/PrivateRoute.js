import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = window.localStorage.getItem("userInfo");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to={"/admin/login"} />;
  }
};

export default PrivateRoute;
