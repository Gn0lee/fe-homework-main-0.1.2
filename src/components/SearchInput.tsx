import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { throttle } from "lodash-es";

import { searchParamsAtom } from "../store/atom";

export default function SearchInput() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const setSearchParams = useSetAtom(searchParamsAtom);

  useEffect(() => {
    const throttledSetSearchParams = throttle((value?: string) => {
      setSearchParams(value);
    }, 500);

    throttledSetSearchParams(search);

    return () => {
      throttledSetSearchParams.cancel();
    };
  }, [search, setSearchParams]);

  return (
    <TextField
      label="Search robot or location"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      type="search"
      size="small"
    />
  );
}
