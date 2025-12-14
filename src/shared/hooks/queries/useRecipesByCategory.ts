import { useQuery } from "@tanstack/react-query";
import { getRecipesByCategory } from "../../api/get-data";

export const useRecipesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["recipes", categoryId],
    queryFn: () => getRecipesByCategory(categoryId),
    enabled: !!categoryId,
  });
};
