import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from "./form.module.scss";
import { forgotPassword } from "../../api/post-data";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const forgotEmailMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      setEmail("");
    },
    onError: (error: any) => {
      console.log(error.response?.data);
      setSuccessMessage("");
    },
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgotEmailMutation.mutate(email);
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
      {forgotEmailMutation.isError && (
        <p className={style.error}>
          {forgotEmailMutation.error?.response?.data?.message ||
            "Password reset failed. Please try again."}
        </p>
      )}
      {successMessage && <p className={style.success}>{successMessage}</p>}
      <div className={style.buttonWrapper}>
        <Button type="submit" disabled={forgotEmailMutation.isPending}>
          {forgotEmailMutation.isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>

      <AnimatePresence>
        {forgotEmailMutation.isPending && (
          <PagePrealoader variant={"transparent"} />
        )}
      </AnimatePresence>
    </form>
  );
};

export default ForgotPasswordForm;
