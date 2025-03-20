import { createContext, useContext, useMemo } from "react";

import moment from "moment";
import { getItemLocalStore } from "./useLocalStore";
import { useNavigate } from "react-router";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = getItemLocalStore("^token");
  const navigate = useNavigate();
  const isAuthValid = () => {
    return user !== null && moment(user.expiredAt) > moment();
  };

  // call this function when you want to authenticate the user
  const invoke_sign = (data) => {
    setUser(data);
    navigate("/");
  };

  const revoke_sign = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      invoke_sign,
      revoke_sign,
      isAuthValid,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
