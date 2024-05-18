import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Error from "../Components/Error";

function ProtectedRoute() {
  const navigate = useNavigate();
  const {isLogIn} = useAppContext()


  if (!isLogIn) {
    navigate("/");
    // return <Error/>
  }

  return <Outlet />;
}

export default ProtectedRoute;
