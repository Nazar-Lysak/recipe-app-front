import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { createRecipe } from "../../api/post-data";
import type { RecipeFormState } from "../useRecipeForm";

interface UseCreateRecipeProps {
  token: string | null;
  onSuccess?: () => void;
}

interface CreateRecipeData {
  name: string;
  description: string;
  time: number | null;
  category: string;
  image: string | null;
  ingredients: string[];
  steps: string[];
}

export const useCreateRecipe = ({ token, onSuccess }: UseCreateRecipeProps) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string[] }>,
    RecipeFormState
  >({
    mutationFn: async (formData: RecipeFormState) => {
      if (!token) throw new Error("No authentication token");

      const preparedData: CreateRecipeData = {
        ...formData,
        ingredients: formData.ingredients.map((ing) => ing.name),
        steps: formData.steps.map((step) => step.text),
      };

      const response = await createRecipe(preparedData, token);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Failed to create recipe:", error.response?.data);
    },
  });
};
