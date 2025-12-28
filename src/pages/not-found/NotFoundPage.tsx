import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Button from "../../shared/ui/button/Button";
import style from "./NotFoundPage.module.scss";
import SadSmile from "../../assets/img/svg/SadSmile";

const NotFoundPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>{t("notFound.title")}</h1>
        <SadSmile />
        <h2 className={style.errorCode}>404</h2>
        <div className={style.textContent}>
          <p className={style.description}>{t("notFound.description")}</p>
        </div>
        <div>
          <Link to="/home">
            <Button>{t("goToHome")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
