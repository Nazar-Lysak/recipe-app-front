import axios from "axios";
import API_URL from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
    token: string;
  };
}

interface SignupPayload {
  email: string;
  username: string;
  password: string;
}

interface SignupResponse {
  user: {
    id: string;
    email: string;
    username: string;
    token: string;
  };
}

interface ForgotPasswordResponse {
  message: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.post<LoginResponse>(
    `${BASE_URL}${API_URL.auth.login}`,
    payload,
  );
  return response.data;
};

export const signup = async (
  payload: SignupPayload,
): Promise<SignupResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  console.log("Signup payload:", payload);
  const response = await axios.post<SignupResponse>(
    `${BASE_URL}${API_URL.auth.signup}`,
    payload,
  );
  return response.data;
};

export const forgotPassword = async (
  email: string,
): Promise<ForgotPasswordResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.post<ForgotPasswordResponse>(
    `${BASE_URL}${API_URL.auth.forgotPassword}`,
    { email },
  );
  return response.data;
};

export const likeRecipe = async (recipeId: string, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/recipe/${recipeId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
