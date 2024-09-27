import React,{useState} from 'react'
import TablePagination from './TablePagination';
import Styles from './styles.module.css'
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@mui/material";

interface ColumnProps {
  title: string;
  id: string;
  selector?: (row: any) => any;
  sortable?: boolean;
}



interface Props<T extends { [key: string]: any }> {
   tableData: T[];
    tableHeader: ColumnProps[];
    handleRowClick: (row: T) => void;
    tableHeight?: number;
    sx?: string
    tableStyle?: string
}

function LoanProductTable<T extends { [key: string]: any }>({tableHeader, tableData, handleRowClick, tableHeight,sx,tableStyle }: Props<T>) {
  const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
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
      <div id="loanProductTableContainer" className={`w-[100%]`}>
          <Paper id="loanProductTablePaper" sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
              <div id="loanProductTableBorder" className='border-[1px] border-[#D0D5DD] border-solid rounded-md'>
                  <TableContainer id="loanProductTableScrollbar" className='scrollbar-custom' sx={{ height: `${tableHeight}vh` }}>
                      <Table id="dynamicTable" stickyHeader sx={{ width: '100%', border: '#d0d5dd', height: 'auto', backgroundColor: '#ffffff' }}>
                          <TableHead id="dynamicTableHead" sx={{backgroundColor: '#e7e7e7'}}>
                              <TableRow id="dynamicTableHeadRow" style={{ position: "sticky", top: 0, backgroundColor: "#fafbfc", zIndex: 1 }}>
                                  {tableHeader.map((column) => (
                                      <TableCell id={`dynamicTableHeadCell${column.id}`} sx={{ }} key={column.id}>
                                          <div id={`dynamicTableHeadCellDiv${column.id}`} className={`${Styles.tableHeaderItem}`}>{column.title}</div>
                                      </TableCell>
                                  ))}
                              </TableRow>
                          </TableHead>
                          <TableBody id="dynamicTableBody">
                              {paginatedData.map((row, rowIndex) => (
                                  <TableRow
                                      id={`dynamicTableBodyRow${rowIndex}`}
                                      hover={true}
                                      key={rowIndex}
                                      sx={{ cursor: '' }}
                                      onClick={() => handleRowClick(row)}
                                      className={`${sx}`}
                                  >
                                      {tableHeader.map((column:any) => (
                                          <TableCell id={`dynamicTableBodyCell${rowIndex}${column.id}`} key={column.id}>
                                              <div id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`} className={`${Styles.tableBodyItem} ${tableStyle}`}>
                                                  {column.selector ? column.selector(row) : row[column.id]}
                                              </div>
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <TablePagination
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
}

export default LoanProductTable