import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState<string>("");

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
