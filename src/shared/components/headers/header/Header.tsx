import type { FC } from "react";
import NotificationIcon from "../../../../assets/img/svg/NotificationIcon";
import SearchIcon from "../../../../assets/img/svg/SearchIcon";
import ButtonIcon from "../../../ui/button-icon/ButtonIcon";
import style from "./Header.module.scss";
import { useSession } from "../../../../context/SessionContext";

const Header: FC = () => {
  const { fullUserData } = useSession();

  return (
    <header className={style.wrapper}>
      <div>
        <h1 className={style.title}>Hi! {fullUserData?.profile?.username}</h1>
        <p className={style.subtitle}>What are you cooking today?</p>
      </div>
      <div className={style.buttons}>
        <ButtonIcon>
          <NotificationIcon />
        </ButtonIcon>
        <ButtonIcon>
          <SearchIcon />
        </ButtonIcon>
      </div>
    </header>
  );
};

export default Header;
