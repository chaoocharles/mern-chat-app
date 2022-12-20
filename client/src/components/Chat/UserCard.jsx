import { useContext } from "react";
import { Stack } from "react-bootstrap";
import avarter from "../../assets/avarter.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFecthLatestMessage } from "../../hooks/useFetchLatestMessage";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import TextTruncate from "react-text-truncate";
import moment from "moment";

const UserCard = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFecthLatestMessage(chat);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  console.log("latestMessage", latestMessage);

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-evenly"
        role="button"
      >
        <div>
          <img src={avarter} alt="person-circle" height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <TextTruncate
                line={1}
                element="span"
                truncateText="…"
                text={latestMessage?.text}
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-column align-items-end align-self-end">
          <div className="date">
            {moment(latestMessage?.createdAt).calendar()}
          </div>
          <div>2</div>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </Stack>
    </>
  );
};

export default UserCard;
