import { useState } from "react";
import ToggleSwitch from "../../shared/ui/toggle-switch/ToggleSwitch";

const NotificationSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newRecipes, setNewRecipes] = useState(true);
  const [newFollowers, setNewFollowers] = useState(false);
  const [recipeLikes, setRecipeLikes] = useState(true);

  return (
    <div>
      <ToggleSwitch
        label="Push-сповіщення"
        checked={pushNotifications}
        onChange={setPushNotifications}
      />
      <ToggleSwitch
        label="Email-сповіщення"
        checked={emailNotifications}
        onChange={setEmailNotifications}
      />
      <ToggleSwitch
        label="Нові рецепти від підписок"
        checked={newRecipes}
        onChange={setNewRecipes}
      />
      <ToggleSwitch
        label="Нові підписники"
        checked={newFollowers}
        onChange={setNewFollowers}
      />
      <ToggleSwitch
        label="Вподобання рецептів"
        checked={recipeLikes}
        onChange={setRecipeLikes}
      />
    </div>
  );
};

export default NotificationSettings;
