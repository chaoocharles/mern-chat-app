import { useContext } from "react";
import { Stack } from "react-bootstrap";
import avarter from "../../assets/avarter.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 rounded"
      role="button"
    >
      <div>
        <img src={avarter} alt="person-circle" height="35px" />
      </div>
      <span>{recipientUser?.name}</span>
      <span className={isOnline ? "user-online" : ""}></span>
    </Stack>
  );
};

export default UserCard;
