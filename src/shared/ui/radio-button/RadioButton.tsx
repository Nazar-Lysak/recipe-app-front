import style from "./RadioButton.module.scss";
import classNames from "classnames";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton = ({ label, checked, ...rest }: RadioButtonProps) => {
  return (
    <label className={style.radioButton}>
      <input type="radio" checked={checked} {...rest} className={style.input} />
      <span className={classNames(style.circle, { [style.checked]: checked })}>
        {checked && <span className={style.innerCircle} />}
      </span>
      <span className={style.label}>{label}</span>
    </label>
  );
};

export default RadioButton;
