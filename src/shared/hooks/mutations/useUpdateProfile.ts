import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface UseUpdateProfileProps {
  token: string;
  onSuccess?: () => void;
}

interface UpdateProfileData {
  theme?: "light" | "dark" | "ocean" | "sunset";
  language?: string;
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  is_private?: boolean;
  avatar_url?: string | null;
  banner_url?: string | null;
}

export const useUpdateProfile = ({
  token,
  onSuccess,
}: UseUpdateProfileProps) => {
  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await axios.put(`${BASE_URL}/user/current`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
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
