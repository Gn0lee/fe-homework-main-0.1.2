import { Select, MenuItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";

import {
  isStarredParamsAtom,
  pageParamsAtom,
  INITIAL_PAGE,
} from "../store/atom";

const GROUP_OPTIONS = Object.freeze({
  ALL: "all",
  STARRED: "starred",
});

export default function GroupSelect() {
  const [selected, setSelected] = useState<string>(GROUP_OPTIONS.ALL);
  const setIsStarredParams = useSetAtom(isStarredParamsAtom);
  const setPageParams = useSetAtom(pageParamsAtom);

  useEffect(() => {
    setIsStarredParams(selected === GROUP_OPTIONS.STARRED ? "true" : "false");
    setPageParams(INITIAL_PAGE);
  }, [selected, setIsStarredParams, setPageParams]);

  return (
    <Select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      size="small"
    >
      <MenuItem value={GROUP_OPTIONS.ALL}>All Locations</MenuItem>
      <MenuItem value={GROUP_OPTIONS.STARRED}>
        <Stack direction="row" spacing={5}>
          <StarIcon sx={{ color: "yellow" }} />
          Starred
        </Stack>
      </MenuItem>
    </Select>
  );
}
