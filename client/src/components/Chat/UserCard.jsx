import { Stack } from "react-bootstrap";
import personCircle from "../../assets/person-circle.svg";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

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
