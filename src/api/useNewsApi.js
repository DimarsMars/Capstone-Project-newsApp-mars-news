import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_API_URL;

export function useNewsApi(query, page = 1) {
  return useQuery({
    queryKey: ['news', query, page],
    queryFn: async () => {
      const news = await axios.get( URL, {
        params: {
          q: query,
          "api-key": API_KEY,
          page,
        },
      });
      return news.data.response.docs;
    },
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selma 5 menit
  });
}