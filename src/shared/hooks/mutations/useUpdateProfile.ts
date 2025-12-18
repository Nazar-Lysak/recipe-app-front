import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UseUpdateProfileProps {
  token: string;
  onSuccess?: () => void;
}

interface UpdateProfileData {
  theme?: "light" | "dark";
  language?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  is_private?: boolean;
  avatar_url?: string;
  banner_url?: string;
}

export const useUpdateProfile = ({ token, onSuccess }: UseUpdateProfileProps) => {
  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await axios.put(
        `http://localhost:3000/user/current`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
};
