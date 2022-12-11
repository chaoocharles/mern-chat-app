import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import ChatBox from "../components/Chat/ChatBox";
import UserCard from "../components/Chat/UserCard";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const {
    potentialChats,
    userChats,
    isUserChatsLoading,
    updateCurrentChat,
    createChat,
  } = useContext(ChatContext);

  return (
    <Container>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((receiver, index) => (
            <div
              className="single-user"
              key={index}
              onClick={() => createChat(user._id, receiver._id)}
            >
              {receiver.name}
            </div>
          ))}
      </div>
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 border-end pe-3" gap={3}>
            {isUserChatsLoading && <p>Fetching Chats..</p>}
            {(!isUserChatsLoading && !userChats) ||
              (!userChats?.length === 0 && <p>No Chats..</p>)}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserCard chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
