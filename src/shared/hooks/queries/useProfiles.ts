import { useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface UseProfilesParams {
  top?: boolean;
  limit?: number;
  offset?: number;
  date?: boolean;
}

export const useProfiles = ({
  top,
  limit,
  offset,
  date,
}: UseProfilesParams) => {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const useParams = new URLSearchParams();

      if (date) {
        useParams.append("date", "true");
      }
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
        `${BASE_URL}/user/profile?${useParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      return response.json();
    },
  });
};
