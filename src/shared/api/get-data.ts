import axios from "axios";
import API_URL from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Category {
  id: string;
  name: string;
}

interface ProfileResponse {
  profile: {
    id: string;
    email: string;
    username: string;
  };
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(
    `${BASE_URL}${API_URL.categories.list}`,
  );
  return response.data;
};

export const getProfileData = async (
  token: string,
): Promise<ProfileResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.get<ProfileResponse>(
    `${BASE_URL}${API_URL.user.current}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
