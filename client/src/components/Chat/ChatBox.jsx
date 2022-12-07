import { useEffect, useState } from "react";
import { useContext } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { baseUrl, getRequest } from "../../utils/service";
import moment from "moment";

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

  if (!recipientUser) return null;

  return (
    <Stack gap={4}>
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3}>
        {messages &&
          messages?.map((message, index) => (
            <Stack
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
              key={index}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).fromNow()}
              </span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
