import { useState } from "react";
import { useSession } from "../../context/useSession";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";
import type { ThemeOption } from "../../shared/types/UI.types";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import RadioButton from "../../shared/ui/radio-button/RadioButton";

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Світла" },
  { value: "dark", label: "Темна" },
  { value: "ocean", label: "Океан" },
  { value: "sunset", label: "Захід сонця" },
];

const ThemePage = () => {
  const [themeToggle, setThemeToggle] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const { token, refreshUserData, fullUserData } = useSession();

  const { theme } = fullUserData || {};

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      setTimeout(async () => {
        await refreshUserData();
        setThemeToggle(false);
        setSelectedTheme(null);
      }, 700);
    },
  });

  const handleThemeSelect = (
    newTheme: "light" | "dark" | "ocean" | "sunset",
  ) => {
    setSelectedTheme(newTheme);
    setThemeToggle(true);
    updateProfileMutation.mutate({ theme: newTheme });
  };

  const displayTheme = selectedTheme || theme;

  return (
    <div>
      {themeOptions.map((option) => (
        <div key={option.value} style={{ marginBottom: "8px" }}>
          <RadioButton
            label={option.label}
            onChange={() => handleThemeSelect(option.value)}
            checked={displayTheme === option.value}
          />
        </div>
      ))}
      {themeToggle && <PagePrealoader variant="transparent" />}
    </div>
  );
};

export default ThemePage;
