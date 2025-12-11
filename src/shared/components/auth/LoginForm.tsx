import { useState } from "react";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from './form.module.scss'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
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
      <InputText
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <div className={style.buttonWrapper}>
        <Button type="submit">Log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
