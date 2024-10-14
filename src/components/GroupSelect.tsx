import { Select, MenuItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

export default function GroupSelect() {
  const [selected, setSelected] = useState<string>("all");

  return (
    <Select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      size="small"
    >
      <MenuItem value="all">All Locations</MenuItem>
      <MenuItem value="starred">
        <Stack direction="row" spacing={5}>
          <StarIcon sx={{ color: "yellow" }} />
          Starred
        </Stack>
      </MenuItem>
    </Select>
  );
}
