import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Button from "../../shared/ui/button/Button";
import style from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.imageContainer}>
          <div className={style.errorCode}>404</div>
        </div>
        <div className={style.textContent}>
          <h1 className={style.title}>{t("notFound.title")}</h1>
          <p className={style.description}>{t("notFound.description")}</p>
        </div>
        <div className={style.buttonContainer}>
          <Link to="/home">
            <Button>{t("goToHome")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
