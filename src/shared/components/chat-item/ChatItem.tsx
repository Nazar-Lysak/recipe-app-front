import { Link } from "react-router";
import style from "./ChatItem.module.scss";

interface ChatItemProps {
  chat: any;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  const { chatWith } = chat;

  return (
    <Link to={`/chat/${chat.id}`} className={style.chatItem}>
      <div className={style.avatar}>
        <img src={chatWith.profile.avatar} alt={chatWith.username} />
      </div>

      <div className={style.content}>
        <div className={style.header}>
          <h3 className={style.name}>{chatWith.username}</h3>
          <span className={style.time}>time</span>
        </div>
        <div className={style.messageRow}>
          <p className={style.lastMessage}>lastMessage</p>
          <span className={style.unreadBadge}>unreadCount</span>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
