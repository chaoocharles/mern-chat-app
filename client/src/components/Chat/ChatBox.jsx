import { useEffect, useState } from "react";
import { useContext } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { baseUrl, getRequest } from "../../utils/service";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [textMessage, setTextMessage] = useState("");

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

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet..
      </p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
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
      <Stack direction="horizontal" className="chat-input flex-grow-0" gap={3}>
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          cleanOnEnter
          theme="dark"
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
        />
        <button className="send-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
