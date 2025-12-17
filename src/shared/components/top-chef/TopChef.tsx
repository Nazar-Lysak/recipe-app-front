import { Link } from "react-router";
import style from "./TopChef.module.scss";
import { useProfiles } from "../../hooks/queries/useProfiles";

const TopChef = () => {
  const allProfiles = useProfiles({ top: true, limit: 4, offset: 0 });

  return (
    <>
      <h2 className={style.title}>Рейтинг кухарів</h2>
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
