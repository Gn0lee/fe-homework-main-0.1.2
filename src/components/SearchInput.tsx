import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";

import { searchParamsAtom } from "../store/atom";

const DEBOUNCE_TIME = 500;

export default function SearchInput() {
  const [enteredSearch, setEnteredSearch] = useState<string>("");
  const setSearchParams = useSetAtom(searchParamsAtom);

  useEffect(() => {
    const debouncedTimeout = setTimeout(() => {
      setSearchParams(enteredSearch);
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debouncedTimeout);
    };
  }, [enteredSearch, setSearchParams]);

  return (
    <TextField
      label="Search robot or location"
      value={enteredSearch}
      onChange={(e) => setEnteredSearch(e.target.value)}
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
