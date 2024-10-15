import React,{useState} from 'react'
import Styles from './styles.module.css'
import { Table,TableRow,TableHead,TableCell,TableBody, TableHeader } from '@/components/ui/table'
import TableContainer from './TableContainer'
import Paginations from './Paginations'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { SelectGroup } from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";


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
      staticColunm?: string,
      staticHeader?: string
  }
  

function Tables<T extends TableRowData> ({tableHeader, tableData, handleRowClick, tableHeight,sx,tableStyle,staticColunm,staticHeader }: Props<T>) {
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
        setDropdownOpen(!dropdownOpen);
      };
    
      // const handleDropdownClose = () => {
      //   setDropdownOpen(false);
      // };

    const paginatedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div id="loanProductTableContainer" className={`w-[100%] `}>
     {/* <Paper   className={`w-[100%] overflow-hidden`} id="loanProductTablePaper"> */}
        <div id="loanProductTableBorder" className='border-[1px] border-[#D0D5DD] border-solid rounded-md hidden md:block '>
            <TableContainer id="loanProductTableScrollbar" style={{ height: `${tableHeight}vh` ,overflow: 'auto'}}>
                <Table id="dynamicTable" stickyHeader={true}>
                    <TableHeader id="dynamicTableHead" className={`bg-[#e7e7e7] h-14 hover:bg-[#e7e7e7]`} sticky={true} >
                        <TableRow id="dynamicTableHeadRow" className={` sticky top-0 bg-[#fafbfc] z-10 hover:bg-[#fafbfc]`}>
                          {
                            tableHeader.map((column) => (
                                <TableHead key={column.id} id={`dynamicTableHeadCell${column.id}`} 
                                // className={`px-[12px] py-[10px] text-[#101828]`}
                                >
                                    <div id={`dynamicTableHeadCellDiv${column.id}`} className={`${Styles.tableHeaderItem}`}>
                                        {column.title}
                                    </div>
                                </TableHead>
                            ))
                          }
                        </TableRow>

                    </TableHeader>
                    <TableBody id="dynamicTableBody" className=''>
                        {paginatedData.map((row, rowIndex) => (
                            <TableRow
                                id={`dynamicTableBodyRow${rowIndex}`}
                                // hover={true}
                                key={rowIndex}
                                // sx={{ cursor: '' }}
                                onClick={() => handleRowClick(row)}
                                className={`${sx}`}
                            >
                                {
                                    tableHeader.map((column) => (
                                        <TableCell
                                            key={`${column.id}${rowIndex}`}
                                            id={`dynamicTableCell${column.id}${rowIndex}`}
                                            // className={`px-[12px] py-[10px] text-[#101828] ${column.id === selectedColumn? 'bg-[#fafbfc]' : ''}`}
                                            className='h-14'
                                        >
                                            <div id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`} className={`${Styles.tableBodyItem} ${tableStyle}`}>
                                            {column.selector? column.selector(row) : row[column.id]}
                                            </div>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
            </TableContainer>
            <Paginations
                page={page}
                rowsPerPage={rowsPerPage}
                tableData={tableData}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
           
        </div>
        <div id="loanProductTableBorderMobile" className="border-[1px]  rounded-md md:hidden w-[100%]">
         <TableContainer id="loanProductTableBorderMobile" className="shadow-none border-none " style={{ height: `${tableHeight}vh` ,overflow: 'auto'}}>
            <Table  id="dynamicTableMobile" stickyHeader={true} className='w-full'  
      >
              <TableHeader id="dynamicTableHeadMobile" className={` h-14 hover:bg-[#e7e7e7] sticky`} sticky={true} >
              <TableRow id="dynamicTableHeadRow" className={` sticky top-0 bg-[#fafbfc] z-10 hover:bg-[#fafbfc]`} >
                 <TableHead style={{ backgroundColor: '#FAFBFC' }}>
                 <h1 className='w-32 text-[#404653] font-semibold text-sm'>{staticHeader}</h1>
                 </TableHead>
                <div>
                 <Select
                
                value={selectedColumn}
                onValueChange={(value) => {
                    setSelectedColumn(value);
                  }}
                onOpenChange={handleDropdownOpen}
                >
                <SelectTrigger 
                className="border-none focus:ring-0 focus:outline-none  text-[15px] text-[#404653] font-semibold mt-[10px] bg-[#fafbfc] shadow-none w-56 flex justify-center"
               
                >
                <SelectValue placeholder="" className=''/>
                <div className='ml-5'>
                {dropdownOpen ? (
          <ChevronUpIcon className="h-4 w-5 font-semibold" />
        ) : (
          <ChevronDownIcon className="h-4 w-5 font-semibold" />
        )}
                </div>
                
           </SelectTrigger>
                <SelectContent
                className='border-none border-[#FAFBFC] text-[#404653]  text-sm'
                >
                <SelectGroup
                  className=''
                >
                    {
                        tableHeader.filter((header) => header.id !== `${staticColunm}`)
                        .map((header) => (
                            <SelectItem key={header.id} value={header.id}
                            className='text-[#404653] hover:bg-[#E7F7ED]'
                            >
                              {header.title}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
                </SelectContent>
              
                </Select> 
                </div>
              </TableRow>
              </TableHeader>
              <TableBody id="dynamicTableBodyMobile" className='w-full'>
                {
                  paginatedData.map((row,index) => (
                    <TableRow
                    key={index}
                    onClick={() => handleRowClick(row)}
                    className={`${sx}`}
                    >
                      <TableCell
                      className='h-14'
                      >
                      <div className=''>{row[`${staticColunm}`]}</div>
                      </TableCell>
                      <TableCell
                      className='h-14'
                      >
                                <div className='flex justify-center'>{row[selectedColumn]}</div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
         </TableContainer>
         <Paginations
                page={page}
                rowsPerPage={rowsPerPage}
                tableData={tableData}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
           

        </div>
     {/* </Paper> */}
        </div>
  )
}

export default Tables