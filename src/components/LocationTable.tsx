import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Stack, Typography } from "@mui/material";
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
import Link from "@mui/material/Link";
import CircleIcon from "@mui/icons-material/Circle";

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

function RobotButton({ robot }: Location) {
  const isOnline = robot?.is_online;

  if (!robot) return <Link>Add</Link>;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <CircleIcon sx={{ color: isOnline ? "green" : "gray" }} />
      <div>{robot.id}</div>
    </Box>
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
    renderCell: (params: GridRenderCellParams<Location>) => (
      <RobotButton {...params.row} />
    ),
  },
  {
    field: "type",
    headerName: "Location Types",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

function NoRowsOverlay() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <Typography variant="h6">No data</Typography>
    </Box>
  );
}

export default function LocationTable() {
  const page = useAtomValue(pageParamsAtom);
  const search = useAtomValue(searchParamsAtom);
  const isStarred = useAtomValue(isStarredParamsAtom);

  const { data } = useQuery(locationQueryOptions({ page, search, isStarred }));

  if (!data) return null;

  if (data.total_count === 0) return <NoRowsOverlay />;

  return (
    <Stack direction="column" spacing={2} alignItems="center" width="100%">
      <DataGrid
        columns={columns}
        rows={data?.locations ?? []}
        disableRowSelectionOnClick
        checkboxSelection
        hideFooter
        sx={{ width: "100%" }}
      />
      {data?.total_count ? (
        <LocationTablePagination totalCount={data.total_count} />
      ) : null}
    </Stack>
  );
}
