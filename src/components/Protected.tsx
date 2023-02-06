import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { LoginContext, LoginDataType } from "../contexts/LoginContext";

const Protected = () => {
  const { data } = useContext(LoginContext);
  if (data.token === "") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default Protected;
