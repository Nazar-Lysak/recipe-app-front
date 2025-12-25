import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markMessagesAsRead } from "../../api/put-data";

export const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, token }: { chatId: string; token: string }) =>
      markMessagesAsRead(chatId, token),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
    },
  });
};
