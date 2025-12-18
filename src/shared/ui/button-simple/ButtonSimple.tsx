import style from "./ButtonSimple.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonSimple = ({ children, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={style.buttonSimple}>
      {children}
    </button>
  );
};

export default ButtonSimple;
