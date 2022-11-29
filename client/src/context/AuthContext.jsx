import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      console.log("Register response:", response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      console.log("Login response:", response);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logoutUser,
        registerInfo,
        updateRegisterInfo,
        loginInfo,
        updateLoginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
