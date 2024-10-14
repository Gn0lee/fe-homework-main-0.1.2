import { Select, MenuItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";

import { isStarredParamsAtom } from "../store/atom";

export default function GroupSelect() {
  const [selected, setSelected] = useState<string>("all");
  const setIsStarredParams = useSetAtom(isStarredParamsAtom);

  useEffect(() => {
    setIsStarredParams(selected === "starred" ? "true" : "false");
  }, [selected, setIsStarredParams]);

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
