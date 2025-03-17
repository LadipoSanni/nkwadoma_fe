import React from 'react'
import { Pagination,PaginationPrevious,PaginationNext,PaginationContent, PaginationItem,PaginationEllipsis } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

interface Props {
    page: number;
    // rowsPerPage: number;
    // tableData: T[];
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    totalPage: number
}

function Paginations({ page, handlePageChange, handleNextPage, handlePreviousPage,totalPage }: Props){
  const totalPages = totalPage;

  const renderPaginationItems = () => {
    const items = [];
    
    if (totalPages > 0) items.push(1);
    if (totalPages > 1) items.push(2);
    if (totalPages > 5) {
      if (page > 3) items.push('...'); 

      for (let i = Math.max(3, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
        items.push(i);
      }
      if (page < totalPages - 2) items.push('...'); 

     
      if (totalPages > 2) items.push(totalPages - 1);
      if (totalPages > 3) items.push(totalPages);
    } else {
     
      for (let i = 3; i <= totalPages; i++) {
        items.push(i);
      }
    }

    return items;
  };

  

  return (
    <div  data-testid="dynamicTablePagination" id="dynamicTablePagination" className={'flex items-center p-3 h-16 justify-between'}>
        <PaginationPrevious
         id="dynamicTablePreviousButton"
        onClick={handlePreviousPage}
        className={`${
          page === 1 ? "invisible" : "visible"
        } gap-1 pl-2.5 h-fit`}
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
            {renderPaginationItems().map((item, index) => {
              if (item === '...') {
                return (
                  <PaginationEllipsis key={index} />
                );
              }
              return (
                <PaginationItem key={index}>
                  <Button
                    className={`${
                      item === page
                        ? 'bg-grey50 text-grey500 hover:bg-gray50 '
                        : 'bg-gray-50 text-gray-500 border-none shadow-none'
                    } px-3 py-1 rounded-full w-fit h-fit`}
                    onClick={(e) => handlePageChange(e, Number(item))}
                  >
                    {item}
                  </Button>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        
       </Pagination> 

      </div>
      
      <PaginationNext
        id="dynamicTableNextButton"
        onClick={handleNextPage}
        className={`${
          page >= totalPages ? "invisible" : "visible"
        } gap-1 pr-2.5  h-fit w-24`}
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