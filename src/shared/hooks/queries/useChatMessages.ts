import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../../api/get-data";

export const useChatMessages = (chatId: string, token: string) => {
  return useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: () => getChatMessages(chatId, token),
    enabled: !!chatId && !!token,
  });
};
