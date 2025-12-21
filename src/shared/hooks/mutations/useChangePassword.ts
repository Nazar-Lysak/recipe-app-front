import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
    mutationFn: async (data: ChangePasswordData) => {
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.put(
        `http://localhost:3000/user/current/password`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data;
    },
    onError: (error: any) => {
      console.error(error.response?.data.message);
    },
  });
};
