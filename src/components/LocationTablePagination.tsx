import { Pagination } from "@mui/material";
import { useAtom } from "jotai";

import { pageAtom } from "../store/atom";

export default function LocationTablePagination() {
  const [page, setPage] = useAtom(pageAtom);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return <Pagination page={page} onChange={handlePageChange} />;
}
