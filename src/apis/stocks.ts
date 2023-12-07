import axios from "axios";

import { API_URL } from "../constants/apis";
import { TOKEN } from "../constants/apis";

export async function getStocks(pageParam: any, searchQuery: string) {
  const headers = { Authorization: `Bearer ${TOKEN}` };
  return await axios
    .get(pageParam ? pageParam : `${API_URL}/v3/reference/tickers`, {
      headers,
      ...(searchQuery ? { params: { search: searchQuery } } : {}),
    })
    .then((res) => {
      return res.data;
    });
}
