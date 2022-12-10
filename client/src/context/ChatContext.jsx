import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  console.log("userChats", userChats);
  console.log("currentChat", currentChat);
  console.log("messages", messages);
  console.log("messagesError", messagesError);
  console.log("onlineUsers", onlineUsers);
  console.log("sendTextMessageError", sendTextMessageError);

  // initialize socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // set online users
  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?._id);
    socket.on("getUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [socket]);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      setUserChatsError(null);

      if (user?._id) {
        const userId = user?._id;

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

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      if (response.error) {
        return setMessagesError(error);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  // send message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      console.log("getMessage", res);
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket]);

  const updateCurrentChat = useCallback(async (chat) => {
    setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId) => {
      console.log("usertttttt", user);
      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: user._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        updateCurrentChat,
        currentChat,
        messages,
        messagesError,
        onlineUsers,
        socket,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
