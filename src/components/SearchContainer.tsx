import { Stack } from "@mui/material";

import GroupSelect from "./GroupSelect";
import SearchInput from "./SearchInput";

export default function SearchContainer() {
  return (
    <Stack direction="row" useFlexGap justifyContent="space-between">
      <GroupSelect />
      <SearchInput />
    </Stack>
  );
}
