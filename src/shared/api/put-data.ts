import axios from "axios";
import API_URL from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const changePassword = async (
  token: string,
  data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  },
): Promise<{ message: string }> => {
  const response = await axios.put<{ message: string }>(
    `${BASE_URL}${API_URL.auth.changePassword}`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return response.data;
};
