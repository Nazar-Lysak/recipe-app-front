import {
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./InputText.module.scss";

export interface InputTextProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: boolean;
  errorText?: string;
  icon?: ReactNode;
  helperText?: string;
  placeholder?: string;
  mask?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const InputText: FC<InputTextProps> = ({
  label,
  error,
  errorText,
  icon,
  helperText,
  placeholder,
  mask,
  size = "medium",
  className,
  type = "text",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div
      className={[styles.inputWrapper, styles[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label
          className={classNames({
            [styles.label]: true,
            [styles.required]: rest.required,
          })}
        >
          {label}
        </label>
      )}
      <div className={styles.inputBox}>
        <input
          placeholder={placeholder}
          type={inputType}
          className={[styles.input, error ? styles.error : ""]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.iconBtn}
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {icon}
          </button>
        )}
        {type !== "password" && icon && (
          <span className={styles.icon}>{icon}</span>
        )}
      </div>
      {helperText && <div className={styles.helper}>{helperText}</div>}
      {error && errorText && (
        <div className={styles.errorText}>{errorText}</div>
      )}
    </div>
  );
};

export default InputText;
