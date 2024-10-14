import { DataGrid } from "@mui/x-data-grid/DataGrid";
import {
  GridPagination,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  GridColDef,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

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

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination() {
  return (
    <GridPagination onPageChange={() => {}} ActionsComponent={Pagination} />
  );
}

export default function LocationTable() {
  return (
    <DataGrid
      columns={columns}
      paginationMode="server"
      slotProps={{
        pagination: {
          ActionsComponent: CustomPagination,
        },
      }}
      disableRowSelectionOnClick
      checkboxSelection
      hideFooter
    />
  );
}
