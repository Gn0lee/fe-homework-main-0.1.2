import { Pagination } from "@mui/material";
import { useAtom } from "jotai";

import { pageParamsAtom } from "../store/atom";

interface LocationTablePaginationProps {
  totalCount: number;
}

const PAGE_SIZE = 6;

export default function LocationTablePagination({
  totalCount,
}: LocationTablePaginationProps) {
  const [page, setPage] = useAtom(pageParamsAtom);

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <Pagination
      count={Math.ceil(totalCount / PAGE_SIZE)}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  );
}
