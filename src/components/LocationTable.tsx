import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";

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

export default function LocationTable() {
  return (
    <DataGrid
      columns={columns}
      disableRowSelectionOnClick
      checkboxSelection
      hideFooter
    />
  );
}
