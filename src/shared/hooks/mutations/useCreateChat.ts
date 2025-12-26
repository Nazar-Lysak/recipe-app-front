import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createChat } from "../../api/post-data";
import { AxiosError } from "axios";

export const useCreateChat = (token: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userId: string) => createChat(userId, token),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/chat/${response.id}`);
    },
    onError: (error: AxiosError<{ chatId?: string }>) => {
      if (error.response?.data?.chatId) {
        navigate(`/chat/${error.response.data.chatId}`);
        return;
      }
      console.error(
        "Error creating chat:",
        error.response?.data || error.message,
      );
    },
  });
};
