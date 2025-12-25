import { useState, useRef, useEffect } from "react";
import style from "./ChatMessagePage.module.scss";
//import Avatar from '../../shared/ui/avatar/Avatar';
import Button from "../../shared/ui/button/Button";

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

const ChatMessagePage = () => {
  const currentUserId = 1;
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  // Dummy data
  const chatPartner = {
    id: 2,
    name: "Maria Johnson",
    username: "mariaj",
    avatar_url: "https://i.pravatar.cc/150?img=5",
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 2,
      content: "Hey! How are you?",
      timestamp: "10:30",
    },
    {
      id: 2,
      senderId: 1,
      content:
        "Hi Maria! I'm doing great, thanks! Just tried that new recipe you shared.",
      timestamp: "10:32",
    },
    {
      id: 3,
      senderId: 2,
      content: "Oh really? How did it turn out?",
      timestamp: "10:33",
    },
    {
      id: 4,
      senderId: 1,
      content:
        "It was delicious! My family loved it. I added some extra spices though.",
      timestamp: "10:35",
    },
    {
      id: 5,
      senderId: 2,
      content: "That's awesome! What spices did you add?",
      timestamp: "10:36",
    },
    {
      id: 6,
      senderId: 1,
      content: "Some cumin and a bit of paprika. It gave it a nice kick!",
      timestamp: "10:38",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        senderId: currentUserId,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 50) {
        setIsHeaderCompact(true);
      } else {
        setIsHeaderCompact(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.chatMessagePage}>
      {/* Header */}
      <div
        className={`${style.header} ${isHeaderCompact ? style.compact : ""}`}
      >
        <div className={style.userInfo}>
          <img src={chatPartner.avatar_url} alt={chatPartner.name} />
          <div className={style.userDetails}>
            <h3 className={style.userName}>{chatPartner.name}</h3>
            <p className={style.userStatus}>@{chatPartner.username}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={style.messagesContainer} ref={messagesContainerRef}>
        <div className={style.messagesList}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${style.messageWrapper} ${
                message.senderId === currentUserId ? style.own : style.other
              }`}
            >
              <div className={style.message}>
                <p className={style.messageContent}>{message.content}</p>
                <span className={style.messageTime}>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={style.messageInput}
        />
        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatMessagePage;
