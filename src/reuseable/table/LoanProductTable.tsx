import React,{useState,useEffect} from 'react'
import Styles from './styles.module.css'
import { Table,TableRow,TableHead,TableCell,TableBody, TableHeader } from '@/components/ui/table'
import TableContainer from './TableContainer'
import Paginations from './TablePagination'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue,SelectGroup } from '@/components/ui/select'
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from '@radix-ui/react-icons'; 
import { Button } from '@/components/ui/button'
import { Menubar,MenubarTrigger,MenubarContent,MenubarMenu,MenubarItem} from '@/components/ui/menubar'




interface ColumnProps<T> {
    title: string;
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
      handleDropDownClick?: (id: string) => void;
      tableHeight?: number;
      sx?: string
      tableStyle?: string
      staticColunm?: string,
      staticHeader?: string,
      showKirkBabel?: boolean ,
      kirkBabDropdownOption?: DropdownOption[],
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
                           handleDropDownClick
}: Props<T>) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
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

  return (
    <div id="loanProductTableContainer" className={`w-[100%] `}>
        <div id="loanProductTableBorder" className='border-[1px] border-[#D0D5DD] border-solid rounded-md hidden md:block '>
            <TableContainer id="loanProductTableScrollbar" style={{ height: `${tableHeight}vh` ,overflow: 'auto'}}>
                <Table id="dynamicTable">
                    <TableHeader id="dynamicTableHead" className={`bg-[#e7e7e7] h-14 hover:bg-[#e7e7e7]`} >
                        <TableRow id="dynamicTableHeadRow" className={` sticky top-0 bg-[#fafbfc] z-10 hover:bg-[#fafbfc]`}
                         style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}
                        >
                          {
                            tableHeader.map((column) => (
                                <TableHead key={column.id} id={`dynamicTableHeadCell${column.id}`} 
                                // className={`px-[12px] py-[10px] text-[#101828]`}
                                style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}
                                >
                                    <div id={`dynamicTableHeadCellDiv${column.id}`} className={`${Styles.tableHeaderItem}`}>
                                        {column.title}
                                    </div>
                                </TableHead>
                            ))
                          }
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
                                            className='h-14'
                                        >
                                            <div id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`}  className={`${Styles.tableBodyItem} ${tableStyle}`}>
                                            {column.selector? column.selector(row) : row[column.id]}
                                            </div>
                                            
                                        </TableCell>
                                       
                                       
                                      
                                         
                                    ))
                                }
                                { showKirkBabel ? 
                                <TableCell
                                className="w-0 "
                                >
                                  {
                                    <Menubar
                                    // onClick={}
                                    >
                                    <MenubarMenu>
                                    <MenubarTrigger asChild className='border-none shadow-none cursor-pointer'>
                                    <Button className='border-none shadow-none' >
                                      <DotsVerticalIcon className="w-5 h-6 text-grey500 font-extrabold" />
                                      </Button>
                                    </MenubarTrigger>
                                    <MenubarContent
                                     className="bg-white shadow-md rounded-md mr-11 relative bottom-6 min-w-[8rem]"
                                    >
                                      {
                                        kirkBabDropdownOption?.map((option, index) => (
                                          <MenubarItem 
                                          key={index}
                                          className='cursor-pointer'
                                          onClick={()=> handleDropDownClick && handleDropDownClick(option.id)}
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
              <TableHeader id="dynamicTableHeadMobile" className={` h-14 hover:bg-[#e7e7e7] sticky`}  >
              <TableRow id="dynamicTableHeadRow" className={` sticky top-0 bg-[#fafbfc] z-10 hover:bg-[#fafbfc]`} >
                 <TableHead 
                 style={{ backgroundColor: '#FAFBFC' }}
                 
                 >
                 <h1 className='w-[91px] text-[#404653] font-semibold text-sm'>{staticHeader}</h1>
                 </TableHead>
                <div>
                 <Select
                
                value={selectedColumn}
                onValueChange={(value: string ) => {
                    setSelectedColumn(value);
                  }}
                onOpenChange={handleDropdownOpen}
                >
                <SelectTrigger 
                className="border-none focus:ring-0 focus:outline-none  text-[15px] text-[#404653] font-semibold mt-[10px] bg-[#fafbfc] shadow-none w-56 flex justify-center"
               
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
     
        </div>
  )
}

export default Tables