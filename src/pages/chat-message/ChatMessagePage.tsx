import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import DateObject from "react-date-object";
import style from "./ChatMessagePage.module.scss";
import ButtonIcon from "../../shared/ui/button-icon/ButtonIcon";
import { useSession } from "../../context/useSession";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import { useChatMessages } from "../../shared/hooks/queries/useChatMessages";
import { useSendMessage } from "../../shared/hooks/mutations/useSendMessage";
import { useMarkMessagesAsRead } from "../../shared/hooks/mutations/useMarkMessagesAsRead";
import ChatIcon from "../../assets/img/svg/ChatIcon";
import SendMessageIcon from "../../assets/img/svg/SendMessageIcon";

const ChatMessagePage = () => {
  const { chatId } = useParams();
  const { token, user } = useSession();
  const chatMessages = useChatMessages(chatId!, token!);
  const [newMessage, setNewMessage] = useState("");
  const { pathname } = useLocation();

  const partisapent = chatMessages?.data?.chats?.chatWith;
  const chatMessagesData = chatMessages?.data?.chats?.messages;

  const mutateMessage = useSendMessage(chatId!, token!);
  const mutateMarkMessageAsRead = useMarkMessagesAsRead();

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      mutateMessage.mutate(trimmedMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatId && token && chatMessagesData?.length) {
      mutateMarkMessageAsRead.mutate({ chatId, token });
    }
  }, [chatMessagesData?.length]);

  useEffect(() => {
    if (pathname.includes("/chat/")) {
      setTimeout(() => {
        const mainElement = document.querySelector("main");
        if (mainElement) {
          mainElement.scrollTop = mainElement.scrollHeight;
        }
      }, 10);
      return;
    }
  }, [pathname, chatMessagesData]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (chatMessages.isLoading) {
    return <PagePrealoader variant="transparent" />;
  }

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
          <img
            src={partisapent?.profile?.avatar || ""}
            alt={partisapent?.username || ""}
          />
          <div className={style.userDetails}>
            <h3 className={style.userName}>@{partisapent?.username}</h3>
            <p className={style.userStatus}>{partisapent?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className={style.messagesContainer}>
        <div className={style.messagesList}>
          {chatMessagesData?.length === 0 && (
            <p>Поки немає повідомлень. Почніть розмову!</p>
          )}
          {chatMessagesData?.map((message: any) => (
            <div
              key={message.id}
              className={`${style.messageWrapper} ${
                user?.id !== message?.sender?.id ? style.other : style.own
              }`}
            >
              <div className={style.message}>
                <p className={style.messageContent}>{message.content}</p>
                <span className={style.messageTime}>
                  {new DateObject(message.createdAt).format(
                    "DD MMM YYYY, HH:mm",
                  )}
                </span>
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

        <ButtonIcon
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || mutateMessage.isPending}
        >
          <SendMessageIcon />
        </ButtonIcon>
      </motion.div>
    </div>
  );
};

export default ChatMessagePage;
