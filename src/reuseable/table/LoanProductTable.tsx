import React,{useState,useEffect,ElementType } from 'react'
import Styles from './styles.module.css'
import { Table,TableRow,TableHead,TableCell,TableBody, TableHeader } from '@/components/ui/table'
import TableContainer from './TableContainer'
import Paginations from './TablePagination'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue,SelectGroup } from '@/components/ui/select'
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from '@radix-ui/react-icons'; 
import { Button } from '@/components/ui/button'
import { Menubar,MenubarTrigger,MenubarContent,MenubarMenu,MenubarItem} from '@/components/ui/menubar'
import TableEmptyState from '../emptyStates/TableEmptyState'





interface ColumnProps<T> {
    title: string | React.ReactNode;
    id: string;
    selector?: (row: T) => React.ReactNode;
    sortable?: boolean;
  }
  
  interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
  }

  interface DropdownOption {
    name: string;
    id: string;
  }
  
  
  
  interface Props<T extends TableRowData> {
     tableData: T[];
      tableHeader: ColumnProps<T>[];
      handleRowClick: (row: T) => void;
      handleDropDownClick?: (id: string,row: TableRowData) => void;
      tableHeight?: number;
      sx?: string
      tableStyle?: string
      staticColunm?: string,
      staticHeader?: string,
      showKirkBabel?: boolean ,
      kirkBabDropdownOption?: DropdownOption[],
      sideBarTabName?: string,
      emptyStateStyle?: string,
      icon?:ElementType,
      optionalFilterName?: string,
      optionalRowsPerPage?: number; 
  }
  

function Tables<T extends TableRowData> ({
                           tableHeader, 
                           tableData, 
                           handleRowClick, 
                           tableHeight,
                           sx,
                           tableStyle,
                           staticColunm,
                           staticHeader, 
                           showKirkBabel,
                           kirkBabDropdownOption,
                           handleDropDownClick,
                           sideBarTabName,
                           emptyStateStyle,
                           icon,
                           optionalFilterName,
                          optionalRowsPerPage = 7,
                           
}: Props<T>) {
    const [page, setPage] = useState(1);
    const rowsPerPage = optionalRowsPerPage;
    const [selectedColumn, setSelectedColumn] = useState(tableHeader[1].id);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

   
   

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null;

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
    
   
    
     

    const paginatedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const isLastPage = page === totalPages;

  return (
    <div id="loanProductTableContainer" className={`w-[100%] `}>
      {
        tableData.length === 0 ? <TableEmptyState icon={icon} name= {sideBarTabName} className={emptyStateStyle} optionalFilterName={optionalFilterName}/> : (
        <div>
        <div id="loanProductTableBorder" className='border-[1px] border-[#D0D5DD] border-solid rounded-md hidden md:block '>
            <TableContainer id="loanProductTableScrollbar" style={{ height: `${tableHeight}vh` ,overflow: 'auto'}}>
                <Table id="dynamicTable" className=''>
                    <TableHeader id="dynamicTableHead" className={`bg-[#F0F2F4]  hover:bg-[#F0F2F4]`} >
                        <TableRow id="dynamicTableHeadRow" className={` sticky top-0     bg-[#F0F2F4]  hover:bg-[#fafbfc]`}
                         style={{ position: 'sticky', top: 0, background: '#fff', }}
                        >
                          {
                            tableHeader.map((column) => (
                                <TableHead key={column.id} id={`dynamicTableHeadCell${column.id}`} 
                                // className={`${Styles.tableHeaderItem} `}
                                // className={`px-[12px] py-[10px] text-[#101828]`}
                                className='bg-[#F0F2F4] h-14 hover:bg-[#F0F2F4]'
                               
                                >
                                    <div  id={`dynamicTableHeadCellDiv${column.id}`} className={`${Styles.tableHeaderItem} `}>
                                        {column.title}
                                    </div>
                                </TableHead>
                            ))
                          }
                          { showKirkBabel? <TableHead  className='bg-gray h-14 hover:bg-gray'></TableHead> :''}
                        </TableRow>

                    </TableHeader>
                    <TableBody id="dynamicTableBody" data-testid="datatable"  className=''>
                        {paginatedData.map((row, rowIndex) => (
                            <TableRow
                                id={`dynamicTableBodyRow${rowIndex}`}
                                key={rowIndex}
                                onClick={() => handleRowClick(row)}
                                className={`${sx}`}
                            >
                                {
                                    tableHeader.map((column) => (
                                       
                                        <TableCell
                                            key={`${column.id}${rowIndex}`}
                                            id={`dynamicTableCell${column.id}${rowIndex}`}
                                            // className={`px-[12px] py-[10px] text-[#101828] ${column.id === selectedColumn? 'bg-[#fafbfc]' : ''}`}
                                            className={`h-1 ${
                                              isLastPage ? 'border-b border-solid ' : ''}`}
                                        >
                                            <div id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`}  className={`${Styles.tableBodyItem} ${tableStyle} `}>
                                            {column.selector? column.selector(row) : row[column.id]}
                                            </div>
                                            
                                        </TableCell>
                                       
                                       
                                      
                                         
                                    ))
                                }
                                { showKirkBabel ? 
                                <TableCell
                                className={`w-0 ${
                                      isLastPage ? 'border-b border-solid' : ''}`}
                                >
                                  {
                                    <Menubar
                                    // onClick={}
                                    >
                                    <MenubarMenu>
                                    <MenubarTrigger asChild className={`border-none shadow-none cursor-pointer hover:bg-b`}>
                                    <Button className='border-none shadow-none' >
                                      <DotsVerticalIcon className="w-5 h-6 text-grey500 font-extrabold" />
                                      </Button>
                                    </MenubarTrigger>
                                    <MenubarContent
                                     className="bg-white shadow-md rounded-md mr-11 relative bottom-6 min-w-[8rem] mt-3"
                                    >
                                      {
                                        kirkBabDropdownOption?.map((option, index) => (
                                          <MenubarItem 
                                          key={index}
                                          className={`cursor-pointer mt-2 pr-8  ${option.id === "3"?"text-error500 focus:text-error500" : ""}`}
                                          onClick={()=> handleDropDownClick && handleDropDownClick(option.id,row)}
                                          >
                                            {option.name}
                                          </MenubarItem>
                                        ))
                                      }
                                     
                                    </MenubarContent>
                                   </MenubarMenu>
                                    </Menubar>
                                  
                                  }

                                </TableCell> : ""
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
            <Table  id="dynamicTableMobile" className='w-full'  
      >
              <TableHeader id="dynamicTableHeadMobile" className={` hover:bg-[#e7e7e7]`}  >
              <TableRow id="dynamicTableHeadRow" className={` top-0 bg-[#fafbfc]  hover:bg-[#fafbfc]`} >
                 <TableHead 
                  className='bg-gray h-14 hover:bg-gray'
                 >
                 <div className='w-[91px] text-[#404653] font-semibold'>{staticHeader}</div>
                 </TableHead>
                <TableHead
                 className='bg-gray h-14 hover:bg-gray'
                >
                 <Select
                
                value={selectedColumn}
                onValueChange={(value: string ) => {
                    setSelectedColumn(value);
                  }}
                onOpenChange={handleDropdownOpen}
                >
                <SelectTrigger 
                className="h-4 border-none focus:ring-0 focus:outline-none  text-[15px] text-[#404653] font-semibold  bg-gray hover:bg-gray shadow-none  flex justify-center relative top-[7px]"
               
                >
                <SelectValue placeholder="" className=''/>
                <div className='ml-4'>
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
                </TableHead>
              </TableRow>
              </TableHeader>
              <TableBody id="dynamicTableBodyMobile" className='w-full'>
                {
                  paginatedData.map((row,rowIndex) => (
                    <TableRow
                    key={rowIndex}
                    onClick={() => handleRowClick(row)}
                    className={`${sx}`}
                    >
                      <TableCell
                      className='h-14 '
                      >
                      <div className=''>
                        {/* {row[`${staticColunm}`]} */}
                        {tableHeader.find((header) => header.id === staticColunm)?.selector
            ? tableHeader.find((header) => header.id === staticColunm)?.selector!(row)
            : row[`${staticColunm}`]}
                        </div>
                      </TableCell>
                          
                      <TableCell
                      className='h-14'
                      >
                                <div 
                                className={`flex justify-center `} 
                                >
                                  {/* {row[selectedColumn]} */}
                                  {tableHeader.find((header) => header.id === selectedColumn)?.selector
            ? tableHeader.find((header) => header.id === selectedColumn)?.selector!(row)
            : row[selectedColumn]}
                                </div>
                      </TableCell>
                      {/* ${row[selectedColumn] === "Accepted"?"bg-error50 text-success600 pt-1 pb-1 pr-1 pl-1 rounded-xl w-24 relative ml-12 mr-12": row[selectedColumn] === "Declined"? 'text-error600 bg-error50 pt-1 pb-1 pr-1 pl-1 rounded-xl w-24 relative ml-12 mr-12 ': ""} */}
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
        </div>
        )
}
        </div>
  )
}

export default Tables

