import SendMessageIcon from "../../../assets/img/svg/SendMessageIcon";
import type { FullUserDataInterface } from "../../types/UI.types";
import ButtonIcon from "../../ui/button-icon/ButtonIcon";
import style from "./ChatCreateItem.module.scss";

const ChatCreateItem = ({
  profile,
  handleCreateChat,
}: {
  profile: FullUserDataInterface;
  handleCreateChat: (userId: string) => void;
}) => {
  return (
    <div className={style.chatCreateItem}>
      <img
        src={profile.avatar_url || ""}
        alt={profile.username}
        className={style.avatar}
      />
      <div className={style.content}>
        <div className={style.username}>{profile.user?.username}</div>
        <div className={style.email}>{profile.user?.email}</div>
      </div>
      <div className={style.actions}>
        <ButtonIcon onClick={() => handleCreateChat(profile?.user?.id!)}>
          <SendMessageIcon />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default ChatCreateItem;
