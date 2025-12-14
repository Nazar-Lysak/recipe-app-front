import axios from "axios";
import API_URL from "./constants";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface CategoriesResponse {
  categories: CategoryItem[];
}

interface ProfileResponse {
  profile: {
    id: string;
    email: string;
    username: string;
  };
}

interface RecipeItem {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  time: number;
}

interface RecipesResponse {
  recipesList: RecipeItem[];
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
  const response = await axios.get<RecipesResponse>(
    `${BASE_URL}${API_URL.recipes.byCategory}?category=${categoryId}`,
  );
  return response.data;
};
