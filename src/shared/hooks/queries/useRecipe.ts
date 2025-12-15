import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "../../api/get-data";

export const useRecipe = (recipeId: string) => {
  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
  });
};
