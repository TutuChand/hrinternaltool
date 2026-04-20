import { useMemo, useState } from "react";

const usePagination = (data = [], itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentData = useMemo(() => {
    return data.slice(indexOfFirst, indexOfLast);
  }, [data, indexOfFirst, indexOfLast]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirst,
    indexOfLast,
    currentData,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
