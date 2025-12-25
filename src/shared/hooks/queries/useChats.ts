import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../api/get-data";

export const useChats = (token: string) => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(token),
    enabled: !!token,
  });
};
