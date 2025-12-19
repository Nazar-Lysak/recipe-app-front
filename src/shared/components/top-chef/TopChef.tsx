import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import style from "./TopChef.module.scss";
import { useProfiles } from "../../hooks/queries/useProfiles";

const TopChef = () => {
  const { t } = useTranslation("recipe");
  const allProfiles = useProfiles({ top: true, limit: 4, offset: 0 });

  return (
    <>
      <h2 className={style.title}>{t("topChefs")}</h2>
      <div className={style.chefs}>
        {allProfiles.data?.profiles.map((profile: any, i: number) => {
          const { avatar_url, user } = profile;
          return (
            <Link key={i} to={`/user/${user.id}`} className={style.chefLink}>
              <img src={avatar_url} alt={user.username} />
              <h3 className={style.username}>{user.username}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TopChef;
