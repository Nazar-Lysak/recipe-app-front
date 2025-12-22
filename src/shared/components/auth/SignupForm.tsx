import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from "./form.module.scss";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";
import { signup } from "../../api/post-data";
import { useNavigate } from "react-router";
import CheckIcon from "../../../assets/img/svg/CheckIcon";
import Popup from "../popup/Popup";
import SadSmile from "../../../assets/img/svg/SadSmile";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // console.log("Signup success:", data);
      // Тут можна зберегти токен і перенаправити користувача
      // navigate("/");
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

    signupMutation.mutate({ email, username, password });
  };

  return (
    <form className={style.container} onSubmit={submit}>
      <InputText
        label="Ім'я користувача"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Іван Іваненко"
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
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введіть ваш пароль"
        type="password"
        required
      />
      <InputText
        label="Підтвердіть пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Повторіть ваш пароль"
        type="password"
        required
      />
      {signupMutation.isError && (
        <div className={style.error}>
          {signupMutation.error?.response?.data?.message ||
            "Не вдалося зареєструватися. Спробуйте ще раз."}
        </div>
      )}
      <div className={style.buttonWrapper}>
        <Button type="submit" disabled={!buttonSubmitValidate()}>
          {signupMutation.isPending ? "Завантаження..." : "Зареєструватися"}
        </Button>
      </div>

      {signupMutation.isError && (
        <Popup onClose={() => {}} isOpen={true}>
          <h2>Помилка реєстрації</h2>
          <SadSmile />
          <p>
            {signupMutation.error?.response?.data?.message ||
              "Не вдалося зареєструватися. Спробуйте ще раз."}
          </p>
          <Button onClick={() => signupMutation.reset()}>Закрити</Button>
        </Popup>
      )}

      {signupMutation.isSuccess && (
        <Popup onClose={() => {}} isOpen={true}>
          <h2>Реєстрація успішна</h2>
          <CheckIcon />
          <p>
            Реєстрація завершена! Перевірте вашу електронну пошту та увійдіть у
            свій акаунт.
          </p>
          <Button onClick={() => navigate("/login")}>Ок</Button>
        </Popup>
      )}

      {signupMutation.isPending && (
        <AnimatePresence>
          <PagePrealoader variant={"transparent"} />
        </AnimatePresence>
      )}
    </form>
  );
};

export default SignupForm;
