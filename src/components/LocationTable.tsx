import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import {
  locationQueryOptions,
  starredLocationIdsQueryOptions,
} from "../query/options";
import {
  pageParamsAtom,
  isStarredParamsAtom,
  searchParamsAtom,
} from "../store/atom";
import LocationTablePagination from "./LocationTablePagination";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { Location } from "../types/location";

const columns: GridColDef<Location>[] = [
  {
    field: "is_starred",
    headerName: "Starred",
    renderHeader() {
      return (
        <IconButton>
          <RefreshIcon />
        </IconButton>
      );
    },
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: "robot",
    headerName: "Robots",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: "type",
    headerName: "Location Types",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

const useLocationTableColumns = () => {
  const { data: starredLocationIds } = useQuery(starredLocationIdsQueryOptions);

  return columns.map((column) => {
    if (column.field === "is_starred") {
      return {
        ...column,
        renderCell(params: GridRenderCellParams<Location>) {
          if (starredLocationIds?.includes(params.row.id)) {
            return (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <IconButton>
                  <StarRoundedIcon sx={{ color: "yellow" }} />
                </IconButton>
              </Box>
            );
          }
          return (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <IconButton>
                <StarOutlineRoundedIcon />
              </IconButton>
            </Box>
          );
        },
      };
    }
    return column;
  });
};

export default function LocationTable() {
  const page = useAtomValue(pageParamsAtom);
  const search = useAtomValue(searchParamsAtom);
  const isStarred = useAtomValue(isStarredParamsAtom);

  const { data } = useQuery(locationQueryOptions({ page, search, isStarred }));

  const columns = useLocationTableColumns();

  if (!data) return null;

  return (
    <Stack direction="column" spacing={2} alignItems="center" width="100%">
      <DataGrid
        columns={columns}
        rows={data.locations}
        disableRowSelectionOnClick
        checkboxSelection
        hideFooter
        sx={{ width: "100%" }}
      />
      <LocationTablePagination totalCount={data.total_count} />
    </Stack>
  );
}
