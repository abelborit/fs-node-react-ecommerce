import { Navigate, Outlet } from "react-router-dom";
import { useFormUserContext } from "../context/formUserContext/FormUserContext";

interface ProtectedRoutesLayoutProps {
  redirectTo?: string;
}

export const ProtectedRoutesLayout = ({
  redirectTo = "/home",
}: ProtectedRoutesLayoutProps) => {
  const { userInfo } = useFormUserContext();
  const { isAuthenticated } = userInfo;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
