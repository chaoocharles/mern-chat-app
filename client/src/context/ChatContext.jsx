import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  console.log("userChats", userChats);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      if (user?._id) {
        const userId = user._id;

        const response = await getRequest(`${baseUrl}/chats/${userId}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
