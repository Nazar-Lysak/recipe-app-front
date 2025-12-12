import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from "./form.module.scss";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";
import { signup } from "../../api/post-data";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup success:", data);
      // Тут можна зберегти токен і перенаправити користувача
      navigate("/");
    },
    onError: (error: any) => {
      // error.response.data - тут буде відповідь з бекенду
      console.log(error.response?.data);
    },
  });

  const buttonSubmitValidate = (): boolean => {
    return (
      (password === confirmPassword &&
        username !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== "") ||
      signupMutation.isPending
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation and API call
    console.log({ username, email, password, confirmPassword });

    signupMutation.mutate({ email, username, password });
  };

  return (
    <form className={style.container} onSubmit={submit}>
      <InputText
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="John Doe"
        type="text"
        required
      />
      <InputText
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.com"
        type="email"
        required
      />
      <InputText
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        type="password"
        required
      />
      <InputText
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repeat your password"
        type="password"
        required
      />
      {signupMutation.isError && (
        <div className={style.error}>
          {signupMutation.error?.response?.data?.message ||
            "Signup failed. Please try again."}
        </div>
      )}
      <div className={style.buttonWrapper}>
        <Button type="submit" disabled={!buttonSubmitValidate()}>
          {signupMutation.isPending ? "Loading..." : "Sign Up"}
        </Button>
      </div>

      <AnimatePresence>
        {signupMutation.isPending && <PagePrealoader variant={"transparent"} />}
      </AnimatePresence>
    </form>
  );
};

export default SignupForm;
