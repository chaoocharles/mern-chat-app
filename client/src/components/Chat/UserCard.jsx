import { Stack } from "react-bootstrap";
import personCircle from "../../assets/person-circle.svg";

const UserCard = () => {
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
        <span>John Doe</span>
        <span className="text-success">online</span>
      </Stack>
    </Stack>
  );
};

export default UserCard;
