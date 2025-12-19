import { useState } from "react";
import { useSession } from "../../context/useSession";
import type { LanguageOption } from "../../shared/types/UI.types";
import RadioButton from "../../shared/ui/radio-button/RadioButton";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";

const languageOptions: LanguageOption[] = [
  { value: "en", label: "Англійська" },
  { value: "ua", label: "Українська" },
];

const LanguageSettings = () => {
  const [languageToggle, setLanguageToggle] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { token, refreshUserData, fullUserData } = useSession();

  const { language } = fullUserData || {};

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      setTimeout(async () => {
        await refreshUserData();
        setLanguageToggle(false);
        setSelectedLanguage(null);
      }, 700);
    },
  });

  const handleLanguageSelect = (newLanguage: "en" | "ua") => {
    setSelectedLanguage(newLanguage);
    setLanguageToggle(true);
    updateProfileMutation.mutate({ language: newLanguage });
  };

  const displayLanguage = selectedLanguage || language;
  return (
    <div>
      {languageOptions.map((option) => (
        <div key={option.value} style={{ marginBottom: "8px" }}>
          <RadioButton
            label={option.label}
            onChange={() => handleLanguageSelect(option.value)}
            checked={displayLanguage === option.value}
          />
        </div>
      ))}
      {languageToggle && <PagePrealoader variant="transparent" />}
    </div>
  );
};

export default LanguageSettings;
