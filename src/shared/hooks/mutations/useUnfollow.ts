import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FullUserDataInterface } from "../../types/UI.types";
import { unfollowUser } from "../../api/delete-data";

interface UseUnfollowProps {
  userId: string;
  token: string;
}

export const useUnfollow = ({ userId, token }: UseUnfollowProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return unfollowUser(userId, token);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", userId] });
      await queryClient.cancelQueries({ queryKey: ["isFollowing", userId] });

      const previousData = queryClient.getQueryData(["user", userId]);
      const previousIsFollowing = queryClient.getQueryData([
        "isFollowing",
        userId,
      ]);

      queryClient.setQueryData(
        ["user", userId],
        (old: FullUserDataInterface | undefined) => {
          if (!old) return old;
          return {
            ...old,
            followers_count: old.followers_count - 1,
          };
        },
      );

      queryClient.setQueryData(["isFollowing", userId], false);

      return { previousData, previousIsFollowing };
    },
    onError: (err, _, context) => {
      console.error("Unfollow error:", err);

      if (context?.previousData) {
        queryClient.setQueryData(["user", userId], context.previousData);
      }
      if (context?.previousIsFollowing !== undefined) {
        queryClient.setQueryData(
          ["isFollowing", userId],
          context.previousIsFollowing,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["isFollowing", userId] });
      queryClient.invalidateQueries({ queryKey: ["all-profiles"] });
    },
  });
};
