import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { locationQueryOptions } from "../query/options";
import {
  pageParamsAtom,
  isStarredParamsAtom,
  searchParamsAtom,
} from "../store/atom";
import LocationTablePagination from "./LocationTablePagination";

const columns: GridColDef[] = [
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
  },
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "robot",
    headerName: "Robot",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "type",
    headerName: "Location Types",
    sortable: false,
    disableColumnMenu: true,
  },
];

export default function LocationTable() {
  const page = useAtomValue(pageParamsAtom);
  const search = useAtomValue(searchParamsAtom);
  const isStarred = useAtomValue(isStarredParamsAtom);

  const { data } = useQuery(locationQueryOptions({ page, search, isStarred }));

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
