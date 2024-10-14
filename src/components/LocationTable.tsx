import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Stack } from "@mui/material";
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
import { usePutLocationStarIdsMutation } from "../query/mutation";
import { Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function ResetStarredButton() {
  const { mutate: putLocationStarIds } = usePutLocationStarIdsMutation();

  return (
    <IconButton onClick={() => putLocationStarIds([])}>
      <RefreshIcon />
    </IconButton>
  );
}

function StarredButton({ id }: Location) {
  const { mutate: putLocationStarIds } = usePutLocationStarIdsMutation();

  const { data: starredLocationIds } = useQuery(starredLocationIdsQueryOptions);

  if (!starredLocationIds) return null;

  const isStarred = starredLocationIds.includes(id);

  const handleClick = () => {
    if (isStarred) {
      putLocationStarIds(
        starredLocationIds.filter((starred) => starred !== id),
      );
    } else {
      putLocationStarIds([...starredLocationIds, id]);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      {isStarred ? (
        <StarRoundedIcon sx={{ color: "yellow" }} />
      ) : (
        <StarOutlineRoundedIcon />
      )}
    </IconButton>
  );
}

function LocationButton({ name, robot }: Location) {
  const isOnline = robot?.is_online;

  return (
    <Button
      disabled={!isOnline}
      endIcon={<ChevronRightIcon />}
      variant="contained"
      fullWidth
    >
      {name}
    </Button>
  );
}

const columns: GridColDef<Location>[] = [
  {
    field: "is_starred",
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    width: 100,
    align: "center",
    renderHeader: () => <ResetStarredButton />,
    renderCell: (params: GridRenderCellParams<Location>) => (
      <StarredButton {...params.row} />
    ),
  },
  {
    field: "name",
    headerName: "Locations",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params: GridRenderCellParams<Location>) => (
      <LocationButton {...params.row} />
    ),
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
