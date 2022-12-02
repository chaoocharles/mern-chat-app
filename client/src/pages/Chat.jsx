import { Container, Row, Stack } from "react-bootstrap";
import UserCard from "../components/Chat/UserCard";

const Chat = () => {
  return (
    <Container>
      <Stack direction="horizontal" gap={4} className="align-items-start  ">
        <Stack
          style={{ height: "100vh" }}
          className="flex-grow-0 border-end pe-3"
          gap={3}
        >
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </Stack>
        <div>ChatBox</div>
      </Stack>
    </Container>
  );
};

export default Chat;
