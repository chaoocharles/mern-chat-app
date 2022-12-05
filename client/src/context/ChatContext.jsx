import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [recipientUser, setRecipientUser] = useState(null);

  console.log("userChats", userChats);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      setUserChatsError(null);

      if (user?._id) {
        const userId = user._id;

        const response = await getRequest(`${baseUrl}/chats/${userId}`);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }

      setIsUserChatsLoading(false);
    };

    getUserChats();
  }, [user]);

  const getRecipientUser = useCallback(async (recipientId) => {
    const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

    setRecipientUser(response);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        recipientUser,
        getRecipientUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
