import { useState } from "react";
import style from "./ChatMessage.module.scss";
//import Avatar from '../../shared/ui/avatar/Avatar';
import Button from "../../shared/ui/button/Button";

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

const ChatMessage = () => {
  const currentUserId = 1;

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
    {
      id: 7,
      senderId: 2,
      content: "I love paprika! Did you serve it with anything special?",
      timestamp: "10:40",
    },
    {
      id: 8,
      senderId: 1,
      content:
        "Yes! I made a side of roasted vegetables. The combination was perfect.",
      timestamp: "10:42",
    },
    {
      id: 9,
      senderId: 2,
      content: "That sounds amazing! Can you send me the recipe?",
      timestamp: "10:43",
    },
    {
      id: 10,
      senderId: 1,
      content: "Sure! I'll share it with you right now.",
      timestamp: "10:45",
    },
    {
      id: 11,
      senderId: 2,
      content: "Thank you so much! I can't wait to try it.",
      timestamp: "10:46",
    },
    {
      id: 12,
      senderId: 1,
      content: "You're welcome! Let me know how it turns out.",
      timestamp: "10:48",
    },
    {
      id: 13,
      senderId: 2,
      content:
        "Will do! By the way, have you tried that new restaurant downtown?",
      timestamp: "10:50",
    },
    {
      id: 14,
      senderId: 1,
      content: "Not yet! Is it good?",
      timestamp: "10:52",
    },
    {
      id: 15,
      senderId: 2,
      content: "It's excellent! They have the best pasta I've ever tasted.",
      timestamp: "10:53",
    },
    {
      id: 16,
      senderId: 1,
      content: "That sounds wonderful! We should go together sometime.",
      timestamp: "10:55",
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

  return (
    <div className={style.chatMessage}>
      {/* Header */}
      <div className={style.header}>
        <div className={style.userInfo}>
          <img src={chatPartner.avatar_url} alt={chatPartner.name} />
          <div className={style.userDetails}>
            <h3 className={style.userName}>{chatPartner.name}</h3>
            <p className={style.userStatus}>@{chatPartner.username}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={style.messagesContainer}>
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

      {/* Input */}
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
          Е
        </Button>
      </div>
    </div>
  );
};

export default ChatMessage;
