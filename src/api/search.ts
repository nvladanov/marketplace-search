import {
  IGetAutocompleteResponse,
  ISearchItem,
  ISearchItemsResponse,
} from "@/interfaces/search";
import axios from "./axios";

export const getAutocomplete = (search: string) =>
  axios.get<IGetAutocompleteResponse>(`/api/item-search/autocomplete`, {
    params: {
      q: search,
      category: "tool-or-service",
    },
  });

export const searchItems = ({
  search,
  page,
  perpage,
}: {
  search: string;
  page: number;
  perpage: number;
}) =>
  axios.get<ISearchItemsResponse>(`/api/item-search`, {
    params: {
      q: search,
      categories: "tool-or-service",
      page,
      perpage,
    },
  });

export const getItem = (id: string) =>
  axios.get<ISearchItem>(`/api/tools-services/${id}`);
