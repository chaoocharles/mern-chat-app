import { createContext } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};
