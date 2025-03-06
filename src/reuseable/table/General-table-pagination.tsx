import React from 'react';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface Props {
  page: number; // Current frontend page
  totalPage: number; // Total frontend pages
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

function Paginations({ page, totalPage, handlePageChange, handleNextPage, handlePreviousPage }: Props) {
  const renderPaginationItems = () => {
    const items = [];

    // Always show the first page
    if (totalPage > 0) items.push(1);

    // Show the second page if it exists
    if (totalPage > 1) items.push(2);

    // Handle ellipsis and middle pages for large numbers of pages
    if (totalPage > 5) {
      if (page > 3) items.push('...'); // Show ellipsis if current page is beyond 3
      for (let i = Math.max(3, page - 1); i <= Math.min(totalPage - 2, page + 1); i++) {
        items.push(i); // Show pages around the current page
      }
      if (page < totalPage - 2) items.push('...'); // Show ellipsis if current page is not near the end
      if (totalPage > 2) items.push(totalPage - 1); // Show the second-to-last page
      if (totalPage > 3) items.push(totalPage); // Show the last page
    } else {
      // Show all pages if there are 5 or fewer
      for (let i = 3; i <= totalPage; i++) {
        items.push(i);
      }
    }

    return items;
  };

  return (
    <div
      data-testid="dynamicTablePagination"
      id="dynamicTablePagination"
      className={'flex items-center p-3 h-16 justify-between'}
    >
      {/* Previous Button */}
      <PaginationPrevious
        id="dynamicTablePreviousButton"
        onClick={handlePreviousPage}
        className={`${page === 1 ? 'invisible' : 'visible'} gap-1 pl-2.5 h-12`}
        style={{
          color: '#101828',
          borderRadius: 'var(--radius-xs, 4px)',
          border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
          background: '#FFF',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          textTransform: 'none',
        }}
      />

      {/* Pagination Numbers */}
      <div className="hidden md:block">
        <Pagination>
          <PaginationContent>
            {renderPaginationItems().map((item, index) => {
              if (item === '...') {
                return <PaginationEllipsis key={index} />; // Render ellipsis
              }
              return (
                <PaginationItem key={index}>
                  <Button
                    className={`${
                      item === page
                        ? 'bg-grey50 text-gray-500 hover:bg-gray50' // Active page style
                        : 'bg-gray-50 text-gray-500 border-none shadow-none' // Inactive page style
                    } px-5 py-1 rounded-full h-10`}
                    onClick={(e) => handlePageChange(e, Number(item))} // Handle page change
                  >
                    {item}
                  </Button>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      </div>

      {/* Next Button */}
      <PaginationNext
        id="dynamicTableNextButton"
        onClick={handleNextPage}
        className={`${
          page >= totalPage ? 'invisible' : 'visible'
        } gap-1 pr-2.5 h-12 w-24`}
        style={{
          color: '#101828',
          borderRadius: 'var(--radius-xs, 4px)',
          border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
          background: '#FFF',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          textTransform: 'none',
        }}
      />
    </div>
  );
}

export default Paginations;