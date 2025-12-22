import axios from "axios";
import API_URL from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const unfollowUser = async (userId: string, token: string) => {
  const response = await axios.delete(
    `${BASE_URL}${API_URL.profile.follow(userId)}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return response.data;
};
