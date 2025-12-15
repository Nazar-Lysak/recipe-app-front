import { useQuery } from "@tanstack/react-query";

interface UseRecipesProps {
  activeCategory: string;
  limit: number;
  offset: number;
}

export const useRecipes = ({
  activeCategory,
  limit,
  offset,
}: UseRecipesProps) => {
  return useQuery({
    queryKey: ["community", activeCategory, offset],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (activeCategory === "1") {
        params.append("top", "true");
      } else if (activeCategory === "2") {
        params.append("newest", "true");
      } else if (activeCategory === "3") {
        params.append("oldest", "true");
      }

      params.append("limit", limit.toString());
      params.append("offset", offset.toString());

      const response = await fetch(
        `http://localhost:3000/recipe?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      return response.json();
    },
    enabled: !!activeCategory,
  });
};
