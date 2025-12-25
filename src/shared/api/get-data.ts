import axios from "axios";
import API_URL from "./constants";
import type {
  CategoryInterface,
  FullUserDataInterface,
  RecipeInterface,
  UserInterface,
} from "../types/UI.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface CategoriesResponse {
  categories: CategoryInterface[];
}

interface RecipesResponse {
  recipesList: RecipeInterface[];
}

interface ChatMessagesResponse {
  chats: {
    chatWith: {
      id: string;
      username: string;
      email: string;
      profile: {
        id: string;
        avatar: string | null;
        firstName: string;
        lastName: string;
      } | undefined;
    } | undefined;
    participants: UserInterface[];
    messages: {
      id: string;
      senderId: string;
      content: string;
      timestamp: string;
    }[];
  };
}

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  const response = await axios.get<CategoriesResponse>(
    `${BASE_URL}${API_URL.categories.list}`,
  );
  return response.data;
};

export const getProfileData = async (
  token: string,
): Promise<FullUserDataInterface> => {
  const response = await axios.get<FullUserDataInterface>(
    `${BASE_URL}${API_URL.profile.current}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<UserInterface> => {
  const response = await axios.get<UserInterface>(
    `${BASE_URL}${API_URL.user.current}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return response.data;
};

export const getRecipesByCategory = async (
  categoryId: string,
): Promise<RecipesResponse> => {
  const response = await axios.get<RecipesResponse>(
    `${BASE_URL}${API_URL.recipes.byCategory}?category=${categoryId}`,
  );
  return response.data;
};

export const getRecipeById = async (
  recipeId: string,
): Promise<RecipeInterface> => {
  const response = await axios.get<RecipeInterface>(
    `${BASE_URL}${API_URL.recipes.byId(recipeId)}`,
  );
  return response.data;
};

export const getUserById = async (
  userId: string,
): Promise<FullUserDataInterface> => {
  const response = await axios.get<FullUserDataInterface>(
    `${BASE_URL}${API_URL.profile.byId(userId)}`,
  );
  return response.data;
};

export const getIsFollowing = async (
  userId: string,
  token: string,
): Promise<boolean> => {
  const response = await axios.get<{ isFollowing: boolean }>(
    `${BASE_URL}${API_URL.profile.isFollowing(userId)}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return response.data.isFollowing;
};

export const getChatMessages = async (chatId: string, token: string):Promise<ChatMessagesResponse> => {
  const response = await axios.get(`${BASE_URL}${API_URL.chats.byId(chatId)}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const getChats = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/chats/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};
