import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./ChatMessagePage.module.scss";
import Button from "../../shared/ui/button/Button";
import ButtonIcon from "../../shared/ui/button-icon/ButtonIcon";

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

const ChatMessagePage = () => {
  console.log("ChatMessagePage rendered - UPDATED v3");
  const currentUserId = 1;
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Dummy data
  const chatPartner = {
    id: 2,
    name: "Maria Johnson TES",
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
      content: "That sounds amazing! Can you send me your roasted veggies recipe?",
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
        "Will do! By the way, have you tried that new Italian restaurant downtown?",
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
      content: "It's excellent! They have the best carbonara I've ever tasted.",
      timestamp: "10:53",
    },
    {
      id: 16,
      senderId: 1,
      content: "That sounds wonderful! We should go together sometime.",
      timestamp: "10:55",
    },
    {
      id: 17,
      senderId: 2,
      content: "Absolutely! How about next weekend?",
      timestamp: "10:57",
    },
    {
      id: 18,
      senderId: 1,
      content: "Perfect! Saturday evening works for me.",
      timestamp: "10:58",
    },
    {
      id: 19,
      senderId: 2,
      content: "Great! I'll make a reservation for 7 PM.",
      timestamp: "11:00",
    },
    {
      id: 20,
      senderId: 1,
      content: "Sounds like a plan! I'm really looking forward to it.",
      timestamp: "11:02",
    },
    {
      id: 21,
      senderId: 2,
      content: "Me too! Oh, and I wanted to ask - do you have any dessert recipes?",
      timestamp: "11:05",
    },
    {
      id: 22,
      senderId: 1,
      content: "Yes! I have an amazing chocolate lava cake recipe.",
      timestamp: "11:07",
    },
    {
      id: 23,
      senderId: 2,
      content: "Oh my, that's my favorite! Can you share it?",
      timestamp: "11:08",
    },
    {
      id: 24,
      senderId: 1,
      content: "Of course! It's surprisingly easy to make too.",
      timestamp: "11:10",
    },
    {
      id: 25,
      senderId: 2,
      content: "Even better! I've always been intimidated by baking.",
      timestamp: "11:12",
    },
    {
      id: 26,
      senderId: 1,
      content: "Don't worry, this one is foolproof. The key is the timing.",
      timestamp: "11:14",
    },
    {
      id: 27,
      senderId: 2,
      content: "I'll definitely try it this weekend. Any tips?",
      timestamp: "11:16",
    },
    {
      id: 28,
      senderId: 1,
      content: "Use good quality chocolate and don't overbake. 12 minutes max!",
      timestamp: "11:18",
    },
    {
      id: 29,
      senderId: 2,
      content: "Got it! I'll set a timer. What chocolate do you recommend?",
      timestamp: "11:20",
    },
    {
      id: 30,
      senderId: 1,
      content: "I usually use dark chocolate with 70% cocoa. It's not too sweet.",
      timestamp: "11:22",
    },
    {
      id: 31,
      senderId: 2,
      content: "Perfect! I have some Belgian chocolate at home.",
      timestamp: "11:24",
    },
    {
      id: 32,
      senderId: 1,
      content: "That'll work great! Belgian chocolate is amazing.",
      timestamp: "11:26",
    },
    {
      id: 33,
      senderId: 2,
      content: "I'm getting excited already! Should I serve it with anything?",
      timestamp: "11:28",
    },
    {
      id: 34,
      senderId: 1,
      content: "Vanilla ice cream on top is classic. Or fresh berries!",
      timestamp: "11:30",
    },
    {
      id: 35,
      senderId: 2,
      content: "Mmm, I love the ice cream idea. Hot and cold together!",
      timestamp: "11:32",
    },
    {
      id: 36,
      senderId: 1,
      content: "Exactly! The contrast is incredible. Let me know how it goes!",
      timestamp: "11:34",
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={style.chatMessagePage}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }}
        className={style.header}
      >
        <div className={style.userInfo}>
          <img src={chatPartner.avatar_url} alt={chatPartner.name} />
          <div className={style.userDetails}>
            <h3 className={style.userName}>{chatPartner.name}</h3>
            <p className={style.userStatus}>@{chatPartner.username}</p>
          </div>
        </div>
      </motion.div>

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

      <motion.div 
        className={style.inputContainer}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={style.messageInput}
        />
        
        <ButtonIcon onClick={handleSendMessage} disabled={!newMessage.trim()}>
          S
        </ButtonIcon>
      </motion.div>
    </div>
  );
};

export default ChatMessagePage;
