import axios from "axios";
import API_URL from "./constants";
import type { Category, Recipe } from "../types/recipe.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface CategoriesResponse {
  categories: Category[];
}

interface ProfileResponse {
  profile: {
    id: string;
    email: string;
    username: string;
  };
}

interface RecipesResponse {
  recipesList: Recipe[];
}

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.get<CategoriesResponse>(
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

export const getRecipesByCategory = async (
  categoryId: string,
): Promise<RecipesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунди затримка
  const response = await axios.get<RecipesResponse>(
    `${BASE_URL}${API_URL.recipes.byCategory}?category=${categoryId}`,
  );
  return response.data;
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  const response = await axios.get<Recipe>(
    `${BASE_URL}${API_URL.recipes.byId}/${recipeId}`,
  );
  return response.data;
};

export const getUserById = async (userId: string): Promise<ProfileResponse> => {
  const response = await axios.get<ProfileResponse>(
    `${BASE_URL}${API_URL.user.byId}/${userId}`,
  );
  return response.data;
};
