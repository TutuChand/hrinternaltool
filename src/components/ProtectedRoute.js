import { useAtom } from "jotai";
import { isLoggedInAtom } from "../atoms/authAtoms";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
