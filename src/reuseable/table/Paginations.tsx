import React from 'react'
import { Pagination,PaginationPrevious,PaginationNext,PaginationContent, PaginationItem,PaginationEllipsis } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

interface Props<T> {
    page: number;
    rowsPerPage: number;
    tableData: T[];
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
}

function Paginations<T>({ page, rowsPerPage, tableData, handlePageChange, handleNextPage, handlePreviousPage }: Props<T>){
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // const getPages = () => {
  //   const pages = [];


  //   for (let i = 1; i <= Math.min(4, totalPages); i++) {
  //     pages.push(i);
  //   }

    
  //   if (totalPages > 5) {
  //     if (page > 4) {
  //       pages.push(-1); 
  //     }
     
  //     for (let i = Math.max(totalPages - 2, 5); i <= totalPages; i++) {
  //       pages.push(i);
  //     }
  //   }

  //   return pages;
  // };
  return (
    <div  data-testid="dynamicTablePagination" id="dynamicTablePagination" className={'flex items-center p-3 h-16 justify-between'}>
        <PaginationPrevious
         id="dynamicTablePreviousButton"
        onClick={handlePreviousPage}
        className={`${
          page === 1 ? "invisible" : "visible"
        } gap-1 pl-2.5`}
        style={{
          color: '#101828',
          borderRadius: 'var(--radius-xs, 4px)',
          border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
          background: '#FFF',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          textTransform: 'none'
        }}

      />
        <div className='hidden md:block'>
        <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <Button
                className={`${
                  index + 1 === page ? "bg-green-100 text-gray-500 hover:bg-green-100 " : "bg-gray-50 text-gray-500 border-none shadow-none"
                } px-4 py-1 rounded-full`}
                onClick={(e) => handlePageChange(e, index + 1)}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          ))}

          {totalPages > 5 && <PaginationEllipsis />}
        </PaginationContent>
         {/* <PaginationContent>
            {getPages().map((pageNum, index) =>
              pageNum === -1 ? (
                <PaginationEllipsis key={index} />
              ) : (
                <PaginationItem key={index}>
                  <Button
                    className={`${
                      pageNum === page
                        ? "bg-green-100 text-gray-500 hover:bg-green-100"
                        : "bg-gray-50 text-gray-500 border-none shadow-none"
                    } px-4 py-1 rounded-full`}
                    onClick={(e) => handlePageChange(e, pageNum)}
                  >
                    {pageNum}
                  </Button>
                </PaginationItem>
              )
            )}
          </PaginationContent> */}
      </Pagination>

      </div>
      
      <PaginationNext
        id="dynamicTableNextButton"
        onClick={handleNextPage}
        className={`${
          page >= totalPages ? "invisible" : "visible"
        } gap-1 pr-2.5`}
        style={{
          color: '#101828',
          borderRadius: 'var(--radius-xs, 4px)',
          border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
          background: '#FFF',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          textTransform: 'none'
        }}
      />
      
      
    </div>
  )
}

export default Paginations