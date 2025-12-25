import { motion } from "framer-motion";
import style from "./ChatMessagePage.module.scss";
import ButtonIcon from "../../shared/ui/button-icon/ButtonIcon";
import { useParams } from "react-router";
import { useSession } from "../../context/useSession";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import { useChatMessages } from "../../shared/hooks/queries/useChatMessages";

const ChatMessagePage = () => {

  const { chatId } = useParams();
  const { token } = useSession();
  const chatMessages = useChatMessages(chatId!, token!);
  
  const partisapent = chatMessages?.data?.chats?.chatWith;
  const chatMessagesData = chatMessages?.data?.chats?.messages;

  const handleSendMessage = () => {
    const trimmedMessage = 'test'

    console.log(trimmedMessage)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if(chatMessages.isLoading){
    return <PagePrealoader variant="transparent" />;
  }

  console.log(partisapent)
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
          <img src={partisapent?.profile?.avatar || ""} alt={partisapent?.username || ""} />
          <div className={style.userDetails}>
            <h3 className={style.userName}>@{partisapent?.username}</h3>
            <p className={style.userStatus}>@{partisapent?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className={style.messagesContainer}>
        <div className={style.messagesList}>
          {
            chatMessagesData?.length === 0 && (
              <p>Поки немає повідомлень. Почніть розмову!</p>
            )
          }
          {
            chatMessagesData?.map((message: any) => (
              <div
                key={message.id}
                className={`${style.messageWrapper} ${
                  message.senderId === partisapent?.id ? style.other : style.own
                }`}
              >
                <div className={style.message}>
                  <p className={style.messageContent}>{message.content}</p>
                  <span className={style.messageTime}>{message.timestamp}</span>
                </div>
              </div>
            ))
          }
          {/* {messages.map((message) => (
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
          ))} */}
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
          // value={newMessage}
          // onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={style.messageInput}
        />
        
        <ButtonIcon onClick={handleSendMessage} disabled={false}>
          S
        </ButtonIcon>
      </motion.div>
    </div>
  );
};

export default ChatMessagePage;
