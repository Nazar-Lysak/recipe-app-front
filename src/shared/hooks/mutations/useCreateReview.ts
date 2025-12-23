import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { createReview } from "../../api/post-data";

interface CreateReviewDataInterface {
  rating: number;
  comment: string;
  image_url?: string;
}

interface UseCreateReviewProps {
  token: string | null;
  recipeId: string;
  data: CreateReviewDataInterface;
  onSuccess?: () => void;
}

export const useCreateReview = ({
  token,
  recipeId,
  onSuccess,
}: UseCreateReviewProps) => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    CreateReviewDataInterface
  >({
    mutationFn: async (data: CreateReviewDataInterface) => {
      const response = createReview(recipeId, data, token!);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["reviews", recipeId] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.log("Error creating review:", error.response?.data);
    },
  });
};
