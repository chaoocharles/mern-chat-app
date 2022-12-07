import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { baseUrl, getRequest } from "../../utils/service";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);

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

  console.log("messages", messages);
  console.log("messagesError", messagesError);

  return <div>{recipientUser?.name}</div>;
};

export default ChatBox;
