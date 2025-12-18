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

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.get<CategoriesResponse>(
    `${BASE_URL}${API_URL.categories.list}`,
  );
  return response.data;
};

export const getProfileData = async (
  token: string,
): Promise<FullUserDataInterface> => {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.get<FullUserDataInterface>(
    `${BASE_URL}${API_URL.profile.current}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getRecipesByCategory = async (
  categoryId: string,
): Promise<RecipesResponse> => {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
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
