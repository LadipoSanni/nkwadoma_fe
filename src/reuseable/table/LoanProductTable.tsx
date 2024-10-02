import React,{useState} from 'react'
import TablePagination from './TablePagination';
import TablePaginationMobile from './TablePaginationMobile';
import Styles from './styles.module.css'
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ColumnProps<T> {
  title: string;
  id: string;
  selector?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
}



interface Props<T extends TableRowData> {
   tableData: T[];
    tableHeader: ColumnProps<T>[];
    handleRowClick: (row: T) => void;
    tableHeight?: number;
    sx?: string
    tableStyle?: string
    staticColunm?: string
}

function LoanProductTable<T extends TableRowData>({tableHeader, tableData, handleRowClick, tableHeight,sx,tableStyle,staticColunm }: Props<T>) {
  const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [selectedColumn, setSelectedColumn] = useState(tableHeader[1].id);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const handleDropdownOpen = () => {
        setDropdownOpen(true);
      };
    
      const handleDropdownClose = () => {
        setDropdownOpen(false);
      };

    const paginatedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    return (
      <div id="loanProductTableContainer" className={`w-[100%] `}>
          <Paper  id="loanProductTablePaper" sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
              <div id="loanProductTableBorder" className='border-[1px] border-[#D0D5DD] border-solid rounded-md hidden md:block'>
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
                                      {tableHeader.map((column) => (
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
              <div  id="loanProductTableBorderMobile" className="border-[1px] border-[#D0D5DD] border-solid rounded-md md:hidden ">
                  <TableContainer id="loanProductTableScrollbarMobile" className='scrollbar-custom' sx={{ height: `${tableHeight}vh` }}>
                    <Table  id="dynamicTable" stickyHeader sx={{ width: '100%', border: '#d0d5dd', height: 'auto', backgroundColor: '#ffffff' }}>
                        <TableHead id="dynamicTableHeadMobile" sx={{backgroundColor: '#e7e7e7',color:"#404653"}}>
                        <TableRow  id="dynamicTableHeadRowMobile" style={{ position: "sticky", top: 0, backgroundColor: "#fafbfc", zIndex: 1 }}>
                            <TableCell sx={{ backgroundColor: '#FAFBFC' }}>
                          <h1 className=' w-28 text-[#404653] font-semibold text-sm'>Loan Product </h1>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#FAFBFC' }}>
                             <FormControl fullWidth>
                            <Select
                              className='border-none border-[#FAFBFC] text-[#404653] w-48 text-sm'
                              value={selectedColumn}
                              onChange={(e) => setSelectedColumn(e.target.value as string)}
                              onOpen={handleDropdownOpen}
                              onClose={handleDropdownClose}
                              displayEmpty
                              IconComponent={() =>
                                dropdownOpen? (<KeyboardArrowUpIcon sx={{ marginRight: '16px' }} />) : (<KeyboardArrowDownIcon sx={{ marginRight: '16px' }}/>)
                              }
                              sx={{
                                fontWeight:"14px",
                                border: 'none',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none', 
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  border: 'none', 
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  border: 'none', 
                                },
                              }}
                            >
                                {
                                    tableHeader.filter((header) => header.id !== `${staticColunm}`)
                                    .map((header) => (
                                        <MenuItem 
                                        key={header.id} value={header.id} 
                                        className='text-[#404653] hover:bg-[#E7F7ED]'
                                        sx={{
                                            '&.Mui-selected': {
                                              backgroundColor: '#E7F7ED', 
                                              color: '#0EAA4F', 
                                            },
                                            '&.Mui-selected:hover': {
                                              backgroundColor: '#E7F7ED', 
                                            },
                                          }}
                                        >
                                            {header.title}
                                        </MenuItem>
                                    ))
                                }

                            </Select>
                            </FormControl>   
                          </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody id="dynamicTableBodyMobile">
                          {
                            paginatedData.map((row,index) => (
                                <TableRow 
                                hover
                                key={index}
                                onClick={() => handleRowClick(row)}
                                >
                                  <TableCell>
                                  <div className=''>{row[`${staticColunm}`]}</div>
                                  </TableCell>
                                  <TableCell>
                                <div className='flex justify-center'>{row[selectedColumn]}</div>
                                  </TableCell>
                                </TableRow>
                            ))
                          }
                        </TableBody>
                    </Table>   
                  </TableContainer>
                  <TablePaginationMobile
                      page={page}
                      rowsPerPage={rowsPerPage}
                      tableData={tableData}
                      handleNextPage={handleNextPage}
                      handlePreviousPage={handlePreviousPage}
                  />
              </div>
          </Paper>
          
      </div>
  );
}

export default LoanProductTable