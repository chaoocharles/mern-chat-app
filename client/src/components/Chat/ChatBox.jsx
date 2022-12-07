import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  console.log("recipientUser", recipientUser);

  return <div>{recipientUser?.name}</div>;
};

export default ChatBox;
