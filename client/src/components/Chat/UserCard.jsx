import { useContext } from "react";
import { Stack } from "react-bootstrap";
import personCircle from "../../assets/person-circle.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers.some(
    (user) => user?.userId === recipientUser?._id
  );

  console.log("isOnline", isOnline);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className=" user-card align-items-start p-2 rounded"
      role="button"
    >
      <div>
        <img src={personCircle} alt="person-circle" height="45px" />
      </div>
      <Stack>
        <span>{recipientUser?.name}</span>
        <span className={isOnline ? "text-success" : "text-danger"}>
          {isOnline ? "Online" : "offline"}
        </span>
      </Stack>
    </Stack>
  );
};

export default UserCard;
