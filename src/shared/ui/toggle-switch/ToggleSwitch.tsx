import { motion } from "framer-motion";
import style from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  disabled,
}: ToggleSwitchProps) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label className={style.container}>
      <span className={style.label}>{label}</span>
      <button
        type="button"
        className={style.toggleSwitch}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        data-checked={checked}
      >
        <motion.div
          className={style.thumb}
          animate={{
            x: checked ? 22 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </label>
  );
};

export default ToggleSwitch;
