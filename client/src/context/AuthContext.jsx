import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log("Auth State", user);

  // use usecallback

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
