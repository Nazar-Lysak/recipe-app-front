import { useQuery } from "@tanstack/react-query";

interface UseRecipesProps {
  activeCategory?: string;
  limit?: number;
  offset?: number;
  username?: string;
  uniqueAuthors?: boolean;
  likedBy?: string;
}

export const useRecipes = ({
  activeCategory,
  limit,
  offset,
  username,
  uniqueAuthors,
  likedBy,
}: UseRecipesProps) => {
  return useQuery({
    queryKey: ["recipes", activeCategory, offset, username, likedBy], 
    queryFn: async () => {
      const params = new URLSearchParams();

      if (activeCategory === "1") {
        params.append("top", "true");
      } else if (activeCategory === "2") {
        params.append("newest", "true");
      } else if (activeCategory === "3") {
        params.append("oldest", "true");
      }

      
      if (likedBy) {
        params.append("likedBy", likedBy);
      }

      if (username) {
        params.append("author", username);
      }

      if (limit !== undefined) {
        params.append("limit", limit.toString());
      }
      if (offset !== undefined) {
        params.append("offset", offset.toString());
      }

      if (uniqueAuthors) {
        params.append("uniqueAuthors", "true");
      }

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