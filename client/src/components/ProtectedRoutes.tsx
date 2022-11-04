import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoutes = () => {
  const userContext = useContext(UserContext);

  return userContext?.user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
