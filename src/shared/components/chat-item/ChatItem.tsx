import DateObject from "react-date-object";
import { Link } from "react-router";
import style from "./ChatItem.module.scss";

interface ChatItemProps {
  chat: any;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  const { chatWith, messages } = chat;

  const lastMessage = messages[messages.length - 1];
  const unreadCount = messages.reduce((count: number, message: any) => {
    return !message.isRead ? count + 1 : count;
  }, 0);

  return (
    <Link to={`/chat/${chat.id}`} className={style.chatItem}>
      <div className={style.avatar}>
        <img src={chatWith.profile.avatar} alt={chatWith.username} />
      </div>

      <div className={style.content}>
        <div className={style.header}>
          <h3 className={style.name}>{chatWith.username}</h3>
          <span className={style.time}>
            {lastMessage?.createdAt && new DateObject(lastMessage.createdAt).format("DD MMM YYYY, HH:mm")}
          </span>
        </div>
        <div className={style.messageRow}>
          <p className={style.lastMessage}>
            {lastMessage ? lastMessage.content : "Немає повідомлень ще."}
          </p>
          {unreadCount > 0 && <span className={style.unreadBadge}>{unreadCount}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
