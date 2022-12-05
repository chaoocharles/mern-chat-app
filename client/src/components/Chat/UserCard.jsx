import { useEffect } from "react";
import { useContext } from "react";
import { Stack } from "react-bootstrap";
import personCircle from "../../assets/person-circle.svg";
import { ChatContext } from "../../context/ChatContext";

const UserCard = ({ chat, user }) => {
  const { recipientUser, getRecipientUser } = useContext(ChatContext);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    getRecipientUser(recipientId);
  }, [recipientId]);

  console.log("recipient", recipientUser);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="align-items-start border p-2 rounded"
      role="button"
    >
      <div>
        <img src={personCircle} alt="person-circle" height="45px" />
      </div>
      <Stack>
        <span>{recipientUser?.name}</span>
        <span className="text-success">online</span>
      </Stack>
    </Stack>
  );
};

export default UserCard;
