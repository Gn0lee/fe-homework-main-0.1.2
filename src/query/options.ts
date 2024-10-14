import { queryOptions, keepPreviousData } from "@tanstack/react-query";

import { api } from "../lib/ky";
import { Location } from "../types/location";

export const locationQueryOptions = ({
  page,
  search,
  isStarred,
}: {
  page: number;
  search: string;
  isStarred: string;
}) =>
  queryOptions({
    queryKey: ["locations", page, search, isStarred],
    queryFn: () =>
      api
        .get("locations", {
          searchParams: {
            page,
            search: search ?? "",
            is_starred: isStarred,
          },
        })
        .json<{
          total_count: number;
          locations: Location[];
        }>(),
    placeholderData: keepPreviousData,
  });
