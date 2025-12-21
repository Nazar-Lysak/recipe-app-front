import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/put-data";

interface UseChangePasswordProps {
  token: string | null;
}

interface ChangePasswordData {
  currentPassword: string;
  confirmNewPassword: string;
  newPassword: string;
}

export const useChangePassword = ({ token }: UseChangePasswordProps) => {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => changePassword(token!, data),
    onError: (error) => {
      console.error("Error changing password:", error);
    },
  });
};
