import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/main" /> : children;
};

export default PublicRoute;