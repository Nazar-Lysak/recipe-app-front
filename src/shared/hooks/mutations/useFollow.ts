import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../api/post-data";
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
      return isFollowing
        ? unfollowUser(userId, token)
        : followUser(userId, token);
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
            followers_count: isFollowing
              ? old.followers_count - 1
              : old.followers_count + 1,
          };
        },
      );

      queryClient.setQueryData(["isFollowing", userId], !isFollowing);

      return { previousData, previousIsFollowing };
    },
    onError: (err, _, context) => {
      console.error("Follow/Unfollow error:", err);

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
    },
  });
};
