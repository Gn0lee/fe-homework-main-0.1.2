import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/ky";
import { Location } from "../types/location";
import { starredLocationIdsQueryOptions } from "./options";

export const usePutLocationStarIdsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: Location["id"][]) =>
      api.put("starred_location_ids", { json: ids }),
    onMutate: async (newIds) => {
      await queryClient.cancelQueries({ queryKey: ["starredLocationIds"] });

      const previousIds = queryClient.getQueryData(
        starredLocationIdsQueryOptions.queryKey,
      );

      if (previousIds) {
        queryClient.setQueryData(starredLocationIdsQueryOptions.queryKey, {
          location_ids: newIds,
        });
      }

      return { previousIds };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData<Location["id"][]>(
        ["starredLocationIds"],
        context?.previousIds?.location_ids,
      );
    },
    onSettled: (_, __, ____, context) => {
      queryClient.invalidateQueries(starredLocationIdsQueryOptions);
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
