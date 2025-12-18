import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FullUserDataInterface } from "../../types/UI.types";

interface UseFollowProps {
  userId: string;
  token: string;
  isFollowing: boolean;
}

export const useFollow = ({ userId, token, isFollowing }: UseFollowProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return axios.post(
        `http://localhost:3000/user/profile/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", userId] });
      const previousData = queryClient.getQueryData(["user", userId]);

      queryClient.setQueryData(
        ["user", userId],
        (old: FullUserDataInterface | undefined) => {
          if (!old) return old;
          return {
            ...old,
            followers_count: isFollowing
              ? old.followers_count - 1
              : old.followers_count + 1,
          };
        }
      );

      return { previousData };
    },
    onError: (err, _, context) => {
      if (axios.isAxiosError(err)) {
        console.error("Server error:", err.response?.data);
      } else {
        console.error("Error:", err.message);
      }

      if (context?.previousData) {
        queryClient.setQueryData(["user", userId], context.previousData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
};
