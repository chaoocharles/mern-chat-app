import { useContext } from "react";
import { Container, Row, Stack } from "react-bootstrap";
import UserCard from "../components/Chat/UserCard";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);

  return (
    <Container>
      <Stack direction="horizontal" gap={4} className="align-items-start  ">
        <Stack
          style={{ height: "100vh" }}
          className="flex-grow-0 border-end pe-3"
          gap={3}
        >
          {isUserChatsLoading && <>Fetching Chats..</>}
          {!isUserChatsLoading && !userChats && <p>No Chats..</p>}
          {userChats?.map((chat, index) => {
            return <UserCard key={index} chat={chat} user={user} />;
          })}
        </Stack>
        <div>ChatBox</div>
      </Stack>
    </Container>
  );
};

export default Chat;
