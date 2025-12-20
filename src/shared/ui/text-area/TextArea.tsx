import { forwardRef } from "react";
import style from "./TextArea.module.scss";
import classNames from "classnames";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={style.container}>
        {label && (
          <label
            className={classNames({
              [style.label]: true,
              [style.required]: rest.required,
            })}
          >
            {label}
          </label>
        )}
        <textarea ref={ref} className={style.textarea} {...rest} />
        {error && <span className={style.error}>{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
