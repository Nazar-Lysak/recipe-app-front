import { type FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./InputSelect.module.scss";

interface SelectOption {
  id: string | number;
  name: string;
}

export interface InputSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputSelect: FC<InputSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  errorText,
  required,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionId: string | number) => {
    onChange?.(optionId);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.inputWrapper, className)}>
      {label && (
        <label
          className={classNames(styles.label, {
            [styles.required]: required,
          })}
        >
          {label}
        </label>
      )}

      <div
        ref={selectRef}
        className={classNames(styles.selectBox, {
          [styles.error]: error,
          [styles.disabled]: disabled,
          [styles.open]: isOpen,
        })}
      >
        <button
          type="button"
          className={styles.selectButton}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span
            className={classNames(styles.selectValue, {
              [styles.placeholder]: !selectedOption,
            })}
          >
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          <svg
            className={styles.arrow}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={classNames(styles.option, {
                  [styles.selected]: option.id === value,
                })}
                onClick={() => handleSelect(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && errorText && (
        <span className={styles.errorText}>{errorText}</span>
      )}
    </div>
  );
};

export default InputSelect;
