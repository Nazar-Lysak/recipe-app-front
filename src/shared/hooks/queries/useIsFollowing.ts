import { useQuery } from "@tanstack/react-query";
import { getIsFollowing } from "../../api/get-data";

export const useIsFollowing = (
  userId: string | undefined,
  token: string | null,
) => {
  return useQuery({
    queryKey: ["isFollowing", userId],
    queryFn: () => getIsFollowing(userId!, token!),
    enabled: !!userId && !!token,
  });
};
