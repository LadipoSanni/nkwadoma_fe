


export function getPaginatedData<T>(
  pageNumber: number,
  pageSize: number,
  data: T[],
  setPageNumber?: (page: number) => void 
) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = pageNumber * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedItems = data.slice(startIndex, endIndex);
  const hasNextPage = endIndex < totalItems;
  const hasPreviousPage = pageNumber > 0;

  if (pageNumber >= totalPages && setPageNumber) {
    setPageNumber(Math.max(0, totalPages - 1));
  }

  return {
    pageNumber,
    pageSize,
    totalPages, 
    totalItems,
    hasNextPage,
    hasPreviousPage, 
    currentPageItems: paginatedItems, 
    goToPage: setPageNumber 
      ? (page: number) => {
          const validPage = Math.max(0, Math.min(page, totalPages - 1));
          setPageNumber(validPage);
        }
      : undefined
  };
}
  