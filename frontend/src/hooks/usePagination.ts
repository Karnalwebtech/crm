"use client"
import { useState, useMemo, useCallback } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

const usePagination = <T extends unknown>({ data, itemsPerPage }: UsePaginationProps<T>) => {
  const [page, setPage] = useState<number>(1);

  // Memoize totalPages to avoid recalculating on every render
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  // Memoize paginated data to recalculate only when page or data changes
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [page, data, itemsPerPage]);

  // Optimized nextPage with useCallback to avoid recreating the function
  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Optimized prevPage with useCallback to avoid recreating the function
  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // Optimized goToPage with useCallback for better performance
  const goToPage = useCallback((pageNumber: number) => {
    setPage(Math.min(Math.max(pageNumber, 1), totalPages));
  }, [totalPages]);

  return {
    currentPage: page,
    totalPages,
    paginatedData,
    nextPage,
    setPage,
    prevPage,
    goToPage,
  };
};

export default usePagination;
