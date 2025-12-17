import { useQuery } from "@tanstack/react-query";

interface UseProfilesParams {
  top: boolean;
  limit?: number;
  offset?: number;
}

export const useProfiles = ({ top, limit, offset }: UseProfilesParams) => {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const useParams = new URLSearchParams();
      if (top) {
        useParams.append("top", "true");
      }

      if (limit !== undefined) {
        useParams.append("limit", limit.toString());
      }

      if (offset !== undefined) {
        useParams.append("offset", offset.toString());
      }

      const response = await fetch(
        `http://localhost:3000/user/profile?${useParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      return response.json();
    },
  });
};
