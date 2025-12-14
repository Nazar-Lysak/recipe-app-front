import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/get-data";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
