import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from "./form.module.scss";
import { login } from "../../api/post-data";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";
import { useNavigate } from "react-router";
import { useSession } from "../../../context/useSession";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      signIn(data.user, data.user.token);
      navigate("/home");
    },
    onError: (error: any) => {
      console.log(error.response?.data);
    },
  });

  const buttonSubmitValidate = (): boolean => {
    return (email !== "" && password !== "") || loginMutation.isPending;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
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
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введіть ваш пароль"
      />
      {loginMutation.isError && (
        <p className={style.error}>
          {loginMutation.error?.response?.data?.message ||
            "Не вдалося увійти. Спробуйте ще раз."}
        </p>
      )}
      <div className={style.buttonWrapper}>
        <Button type="submit" disabled={!buttonSubmitValidate()}>
          {loginMutation.isPending ? "Завантаження..." : "Увійти"}
        </Button>
      </div>

      <AnimatePresence>
        {loginMutation.isPending && <PagePrealoader variant={"transparent"} />}
      </AnimatePresence>
    </form>
  );
};

export default LoginForm;
