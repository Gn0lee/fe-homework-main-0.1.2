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

export const starredLocationIdsQueryOptions = queryOptions({
  queryKey: ["starredLocationIds"],
  queryFn: () =>
    api.get("starred_location_ids").json<{ location_ids: Location["id"][] }>(),
  select: (data) => data.location_ids,
});
