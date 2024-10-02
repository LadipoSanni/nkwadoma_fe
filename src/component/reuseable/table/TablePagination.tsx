import React from 'react';
import {Button, Pagination} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props<T> {
    page: number;
    rowsPerPage: number;
    tableData: T[];
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
}

function TablePagination<T>({ page, rowsPerPage, tableData, handlePageChange, handleNextPage, handlePreviousPage }: Props<T>) {
  return (
    <div data-testid="dynamicTablePagination" id="dynamicTablePagination" className={'flex items-center p-3 h-16 justify-between'}>
    <Button
        id="dynamicTablePreviousButton"
        onClick={handlePreviousPage}
        startIcon={<ArrowBackIcon sx={{color: '#667085'}} />}
        sx={{
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
    <Pagination
        id="dynamicTablePaginationControl"
        count={Math.ceil(tableData.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        hideNextButton={true}
        hidePrevButton={true}
        sx={{
            '& .MuiPaginationItem-root': {
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '20px',
                color: 'var(--Foundation-Blue-blue-800, #72757A)',
            },
            '& .Mui-selected': {
                color: 'var(--Default-colors-Body, #101828)',
                backgroundColor: '#F0F2F4',
            },
        }}
    />
    <Button
        id="dynamicTableNextButton"
        onClick={handleNextPage}
        endIcon={<ArrowForwardIcon sx={{color: '#667085'}}/>}
        sx={{
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

export default TablePagination