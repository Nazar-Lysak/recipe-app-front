import { useState } from "react";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from './form.module.scss'

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation and API call
    console.log({ username, email, password, confirmPassword });
  };

  return (
    <form className={style.container} onSubmit={submit}>
      <InputText
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="John Doe"
        type="text"
        required
      />
      <InputText
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="example@example.com"
        type="email"
        required
      />
      <InputText
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        type="password"
        required
      />
      <InputText
        label="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Repeat your password"
        type="password"
        required
      />
      <div className={style.buttonWrapper}>
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );
};

export default SignupForm;
