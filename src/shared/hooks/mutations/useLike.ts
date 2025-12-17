import { useOptimistic, startTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "../../../context/SessionContext";
import { likeRecipe } from "../../api/post-data";

export const useLike = (recipeId: string, initialLikes: number) => {
  const { token } = useSession();
  const queryClient = useQueryClient();

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (_, newValue: number) => newValue
  );

  const mutation = useMutation({
    mutationFn: async () => {
      return await likeRecipe(recipeId, token || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Failed to like:", error.response?.data || error.message);
      } else {
        console.error("Failed to like:", error);
      }
    },
  });

  const handleLike = () => {
    startTransition(() => {
      setOptimisticLikes(optimisticLikes + 1);
    });

    mutation.mutate();
  };

  return {
    optimisticLikes,
    handleLike,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
