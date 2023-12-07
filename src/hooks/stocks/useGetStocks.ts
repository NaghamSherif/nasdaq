import { useInfiniteQuery } from "@tanstack/react-query";
import { getStocks } from "../../apis/stocks";

export function useGetStocks(searchQuery: string) {
  return useInfiniteQuery({
    queryKey: ["stocks-list", searchQuery],
    queryFn: ({ pageParam = 0 }) => getStocks(pageParam, searchQuery),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.next_url;
    },
  });
}
