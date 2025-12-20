import type { FC } from "react";
import { useTranslation } from "react-i18next";
import style from "./ProfileDetails.module.scss";
import type { FullUserDataInterface } from "../../types/UI.types";

interface ProfileDetailsProps {
  userData: FullUserDataInterface;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({ userData }) => {
  const { t } = useTranslation("userProfile");
  const {
    first_name,
    last_name,
    location,
    website,
    facebook,
    instagram,
    tiktok,
    youtube,
  } = userData;

  const socialLinks = [
    { name: "Website", url: website, icon: "🌐" },
    { name: "Facebook", url: facebook, icon: "📘" },
    { name: "Instagram", url: instagram, icon: "📷" },
    { name: "TikTok", url: tiktok, icon: "🎵" },
    { name: "YouTube", url: youtube, icon: "▶️" },
  ].filter((link) => link.url);

  const hasPersonalInfo = first_name || last_name || location;

  return (
    <div className={style.container}>
      {hasPersonalInfo && (
        <div className={style.infoGrid}>
          {(first_name || last_name) && (
            <div className={style.infoItem}>
              <span className={style.label}>{t("details.fullName")}</span>
              <span className={style.value}>
                {first_name} {last_name}
              </span>
            </div>
          )}

          {location && (
            <div className={style.infoItem}>
              <span className={style.label}>{t("details.location")}</span>
              <span className={style.value}>{location}</span>
            </div>
          )}
        </div>
      )}

      {socialLinks.length > 0 && (
        <div className={style.socialSection}>
          <h4 className={style.sectionTitle}>{t("details.socialLinks")}</h4>
          <div className={style.socialGrid}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url || ""}
                target="_blank"
                rel="noopener noreferrer"
                className={style.socialLink}
              >
                <span className={style.icon}>{link.icon}</span>
                <span className={style.linkName}>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
