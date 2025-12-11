import { useState } from "react";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from './form.module.scss'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <form className={style.container} onSubmit={submit}>
      <InputText
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="example@example.com"
        type="email"
      />
      <div className={style.buttonWrapper}>
        <Button type="submit">Send Reset Link</Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
