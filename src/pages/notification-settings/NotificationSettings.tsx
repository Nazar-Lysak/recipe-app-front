import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../../shared/ui/toggle-switch/ToggleSwitch";

const NotificationSettings = () => {
  const { t } = useTranslation("profile");
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newRecipes, setNewRecipes] = useState(true);
  const [newFollowers, setNewFollowers] = useState(false);
  const [recipeLikes, setRecipeLikes] = useState(true);

  return (
    <div>
      <ToggleSwitch
        label={t("notificationsSettings.pushNotifications")}
        checked={pushNotifications}
        onChange={setPushNotifications}
      />
      <ToggleSwitch
        label={t("notificationsSettings.emailNotifications")}
        checked={emailNotifications}
        onChange={setEmailNotifications}
      />
      <ToggleSwitch
        label={t("notificationsSettings.newRecipes")}
        checked={newRecipes}
        onChange={setNewRecipes}
      />
      <ToggleSwitch
        label={t("notificationsSettings.newFollowers")}
        checked={newFollowers}
        onChange={setNewFollowers}
      />
      <ToggleSwitch
        label={t("notificationsSettings.recipeLikes")}
        checked={recipeLikes}
        onChange={setRecipeLikes}
      />
    </div>
  );
};

export default NotificationSettings;
