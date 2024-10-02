import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import styles from "../table/styles.module.css"
import TablePagination from "./TablePagination";

interface ColumnProps<T> {
    title: string;
    id: string;
    selector?: (row: T) => string;
    sortable?: boolean;
}

interface TableProps<T extends { [key: string]: string }> {
    tableData: T[];
    tableHeader: ColumnProps<T>[];
    handleRowClick: (row: T) => void;
    tableHeight?: number;
}

const DynamicTable = <T extends { [key: string]: string }>({
                                                               tableHeader,
                                                               tableData,
                                                               handleRowClick,
                                                               tableHeight
                                                           }: TableProps<T>) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleNextPage = () => {
        if (page < Math.ceil(tableData.length / rowsPerPage)) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const paginatedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div data-testid="dynamicTableContainer" id={`dynamicTableContainer`} className={`w-[100%]`}>
            <Paper data-testid="dynamicTablePaper" id={`dynamicTablePaper`} sx={{width: '100%', overflow: 'hidden'}} elevation={0}>
                <div data-testid="dynamicTableBorder" id={`dynamicTableBorder`}
                     className='border-[1px] border-learnSpaceGray border-solid rounded'>
                    <TableContainer data-testid="dynamicTableScrollbar" id={`dynamicTableScrollbar`} className='scrollbar-custom'
                                    sx={{height: `${tableHeight}vh`}}>
                        <Table data-testid="dynamicTable" id={`dynamicTable`} stickyHeader
                               sx={{width: '100%', border: '#d0d5dd', height: 'auto', backgroundColor: '#ffffff'}}>
                            <TableHead data-testid="dynamicTableHead" id={`dynamicTableHead`} sx={{backgroundColor: '#e7e7e7'}}>
                                <TableRow data-testid="dynamicTableHeadRow" id={`dynamicTableHeadRow`}
                                          style={{position: "sticky", top: 0, backgroundColor: "#fafbfc", zIndex: 1}}>
                                    {tableHeader.map((column) => (
                                        <TableCell data-testid={`dynamicTableHeadCell${column.id}`} id={`dynamicTableHeadCell`}
                                                   sx={{backgroundColor: '#fafbfc'}} key={column.id}>
                                            <div data-testid={`dynamicTableHeadCellDiv${column.id}`} id={`dynamicTableHeadCellDiv`}
                                                 className={`${styles.tableHeader}`}>
                                                {column.title}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody data-testid="dynamicTableBody" id={`dynamicTableBody`}>
                                {paginatedData.map((row, rowIndex) => (
                                    <TableRow
                                        id={`dynamicTableBodyRow`}
                                        data-testid={`dynamicTableBodyRow${rowIndex}`}
                                        hover={true}
                                        key={rowIndex}
                                        sx={{cursor: 'pointer'}}
                                        onClick={() => handleRowClick(row)}
                                    >
                                        {tableHeader.map((column) => (
                                            <TableCell id={`dynamicTableBodyCell`} data-testid={`dynamicTableBodyCell${rowIndex}${column.id}`}
                                                       key={column.id}>
                                                <div data-testid={`dynamicTableBodyCellDiv${rowIndex}${column.id}`} id={`dynamicTableBodyCellDiv`}
                                                     className={`${styles.tableRow}`}>
                                                    {column.selector ? column.selector(row) : String(row[column.id] ?? '')}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        data-testid="dynamicTableBodyRow1"
                        page={page}
                        rowsPerPage={rowsPerPage}
                        tableData={tableData}
                        handlePageChange={handlePageChange}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default DynamicTable;
