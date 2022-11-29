import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("Auth State", user);
  console.log("Register State", registerInfo);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = () => {};

  const loginUser = () => {};

  const logoutUser = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logoutUser,
        registerInfo,
        updateRegisterInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
