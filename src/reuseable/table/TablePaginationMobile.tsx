import React from 'react';
import {Button} from "@/components/ui/button";


interface Props<T> {
    page: number;
    rowsPerPage: number;
    tableData: T[];
    handleNextPage: () => void;
    handlePreviousPage: () => void;
}

function TablePaginationMobile<T>({ page, rowsPerPage, tableData,handleNextPage, handlePreviousPage }: Props<T>) {
  return (
    <div data-testid="dynamicTablePagination" id="dynamicTablePagination" className={'flex items-center p-3 h-16 justify-between'}>
    <Button
        id="dynamicTablePreviousButton"
        onClick={handlePreviousPage}
        // startIcon={<ArrowBackIcon sx={{color: '#667085'}} />}
        style={{
            color: '#101828',
            borderRadius: 'var(--radius-xs, 4px)',
            border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
            background: '#FFF',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            visibility: page === 1 ? 'hidden' : 'visible',
            textTransform: 'none'
        }}
    >
        Previous
    </Button>
   
    <Button
        id="dynamicTableNextButton"
        onClick={handleNextPage}
        // endIcon={<ArrowForwardIcon sx={{color: '#667085'}}/>}
        style={{
            color: '#101828',
            borderRadius: 'var(--radius-xs, 4px)',
            border: '1px solid var(--Default-colors-Borders, #D0D5DD)',
            background: '#FFF',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            visibility: page >= Math.ceil(tableData.length / rowsPerPage)? 'hidden' : 'visible',
            textTransform: 'none'

        }}
    >
        Next
    </Button>
</div>
  )
}

export default TablePaginationMobile