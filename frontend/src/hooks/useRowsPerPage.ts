import { useState, useCallback } from 'react';

const useRowsPerPage = (initialRowsPerPage: number) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [page, setPage] = useState(1);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset page to 1 when rows per page changes
  }, []);

  return {
    rowsPerPage,
    page,
    onRowsPerPageChange,
  };
};

export default useRowsPerPage;
