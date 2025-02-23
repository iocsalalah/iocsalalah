import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  let auth = localStorage.getItem("isLoggedIn");
  // console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
