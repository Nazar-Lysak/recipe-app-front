import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../api/post-data";

export const useSendMessage = (chatId: string, token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendMessage(chatId, content, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
    },
  });
};
