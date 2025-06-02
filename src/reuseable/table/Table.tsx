import React, { useState, useEffect, ElementType } from "react";
import Styles from "./styles.module.css";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import TableContainer from "./TableContainer";
// import Paginations from "./TablePagination";
import Paginations from "./Pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarMenu,
  MenubarItem,
} from "@/components/ui/menubar";
import TableEmptyState from "../emptyStates/TableEmptyState";
import SkeletonForTable from "../Skeleton-loading-state/Skeleton-for-table";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

interface ColumnProps<T> {
  title: string | React.ReactNode;
  id: string;
  selector?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode | object;
}

interface DropdownOption {
  name: string;
  id: string;
}

interface Props<T extends TableRowData> {
  tableData: T[];
  tableHeader: ColumnProps<T>[];
  handleRowClick: (row: T) => void;
  handleDropDownClick?: (id: string, row: TableRowData) => void;
  tableHeight?: number;
  sx?: string;
  tableStyle?: string;
  staticColunm?: string;
  staticHeader?: string;
  showKirkBabel?: boolean;
  kirkBabDropdownOption?: DropdownOption[];
  sideBarTabName?: string;
  emptyStateStyle?: string;
  icon?: ElementType | React.ReactNode ;
  optionalFilterName?: string;
//   optionalRowsPerPage?: number;
  tableCellStyle?: string;
  condition?: boolean;
  isLoading?: boolean;
  searchEmptyState?: boolean;
  totalPages: number;
  pageNumber: number;
  hasNextPage: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

function DataTable<T extends TableRowData>({
                                          searchEmptyState,
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
//   optionalRowsPerPage = 8,
  tableCellStyle,
  condition,
  isLoading,
  totalPages,
  pageNumber,
  hasNextPage,
  setPageNumber
}: Props<T>) {
  // const [page, setPage] = useState(pageNumber + 1);
//   const rowsPerPage = optionalRowsPerPage;
  const [selectedColumn, setSelectedColumn] = useState(tableHeader[1].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  

  if (!isMounted) return null;

  

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPageNumber(newPage-1);
  };

  const handleNextPage = () => {
        if (hasNextPage) {
          setPageNumber((prevPage) => prevPage + 1);    
     }
   
  };

  const handlePreviousPage = () => {
        if (pageNumber  > 0) {
          setPageNumber((prevPage) => prevPage - 1)
          }
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderCellContent = (
    value:
      | string
      | number
      | boolean
      | React.ReactNode
      | object
      | null
      | undefined
  ) => {
    if (React.isValidElement(value)) {
      return value;
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  const isLastPage = pageNumber + 1 === totalPages;

  return (
    <div id="loanProductTableContainer" className={`w-[100%] `}>
      {isLoading ? (
        <SkeletonForTable />
      ) : tableData?.length === 0 ? (
          <div>
            {searchEmptyState ?
                <TableEmptyState
                    icon={<MagnifyingGlassIcon/>}
                    name={sideBarTabName}
                    className={emptyStateStyle}
                    optionalFilterName={optionalFilterName}
                    condition={condition}
                    isSearch={true}
                />
                // <div>
                //   <MagnifyingGlassIcon/>
                // </div>
                :
                <TableEmptyState
                    icon={icon}
                    name={sideBarTabName}
                    className={emptyStateStyle}
                    optionalFilterName={optionalFilterName}
                    condition={condition}
                />
            }
          </div>

      ) : (
        <div>
          <div
            id="loanProductTableBorder"
            className="border-[1px] border-[#D0D5DD] border-solid rounded-md hidden md:block "
          >
            <TableContainer
              id="loanProductTableScrollbar"
              style={{ height: `${tableHeight}vh`, overflow: "auto" }}
            >
              <Table id="dynamicTable" className="">
                <TableHeader
                  id="dynamicTableHead"
                  className={`bg-[#F0F2F4] sticky top-0  hover:bg-[#F0F2F4]`}
                >
                  <TableRow
                    id="dynamicTableHeadRow"
                    className={` sticky top-0     bg-[#F0F2F4]  hover:bg-[#fafbfc]`}
                    style={{ position: "sticky", top: 0, background: "#fff" }}
                  >
                    {tableHeader.map((column) => (
                      <TableHead
                        key={column.id}
                        id={`dynamicTableHeadCell${column.id}`}
                        // className={`${Styles.tableHeaderItem} `}
                        // className={`px-[12px] py-[10px] text-[#101828]`}
                        className="bg-[#F0F2F4] h-10 hover:bg-[#F0F2F4]"
                      >
                        <div
                          id={`dynamicTableHeadCellDiv${column.id}`}
                          className={`${Styles.tableHeaderItem} `}
                        >
                          {column.title}
                        </div>
                      </TableHead>
                    ))}
                    {showKirkBabel ? (
                      <TableHead className="bg-[#F0F2F4] h-12 hover:bg-[#F0F2F4]"></TableHead>
                    ) : (
                      ""
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody
                  id="dynamicTableBody"
                  data-testid="datatable"
                  className=""
                >
                  {tableData?.map((row, rowIndex) => (
                    <TableRow
                      id={`dynamicTableBodyRow${rowIndex}`}
                      key={rowIndex}
                      // onClick={() => handleRowClick(row)}
                      className={`${sx}`}
                    >
                      {tableHeader.map((column) => (
                        <TableCell
                          onClick={() => handleRowClick(row)}
                          key={`${column.id}${rowIndex} `}
                          id={`dynamicTableCell${column.id}${rowIndex}`}
                          // className={`px-[12px] py-[10px] text-[#101828] ${column.id === selectedColumn? 'bg-[#fafbfc]' : ''}`}
                          className={`h-1 ${
                            isLastPage ? "border-b border-solid " : ""
                          } ${tableCellStyle} overflow-hidden whitespace-nowrap text-ellipsis max-w-[80px]  `}
                        >
                          <div
                            id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`}
                            // truncate
                            className={`${Styles.tableBodyItem} ${tableStyle}   `}
                            // style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "200px",  }}
                          >
                            {/* {column.selector ? column.selector(row) : row[column.id]} */}
                            {renderCellContent(
                              column.selector
                                ? column.selector(row)
                                : row[column.id]
                            )}
                          </div>
                        </TableCell>
                      ))}
                      {showKirkBabel ? (
                        <TableCell
                          className={`w-0 ${
                            isLastPage ? "border-b border-solid" : ""
                          }`}
                        >
                          {
                            <Menubar
                            // onClick={}
                            >
                              <MenubarMenu>
                                <MenubarTrigger
                                  asChild
                                  className={`border-none shadow-none cursor-pointer hover:bg-b`}
                                >
                                  <Button className="border-none shadow-none" id="kirkBabButton">
                                    <DotsVerticalIcon className="w-5 h-6 text-grey500 font-extrabold" />
                                  </Button>
                                </MenubarTrigger>
                                <MenubarContent className="bg-white shadow-md rounded-md mr-11 relative bottom-6 min-w-[8rem] mt-3">
                                  {kirkBabDropdownOption?.map(
                                    (option, index) => (
                                      <MenubarItem
                                       id={`${index}optionItem`}
                                        key={index}
                                        className={`cursor-pointer mt-2 pr-8  ${
                                          option.id === "3"
                                            ? "text-error500 focus:text-error500"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleDropDownClick &&
                                          handleDropDownClick(option.id, row)
                                        }
                                      >
                                        {option.name}
                                      </MenubarItem>
                                    )
                                  )}
                                </MenubarContent>
                              </MenubarMenu>
                            </Menubar>
                          }
                        </TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paginations
              page={pageNumber + 1}
              totalPage={totalPages}
              handlePageChange={handlePageChange}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          </div>
          <div
            id="loanProductTableBorderMobile"
            className="border-[1px]  rounded-md md:hidden w-[100%]"
          >
            <TableContainer
              id="loanProductTableBorderMobile"
              className="shadow-none border-none "
              style={{ height: `${tableHeight}vh`, overflow: "auto" }}
            >
              <Table id="dynamicTableMobile" className="w-full">
                <TableHeader
                  id="dynamicTableHeadMobile"
                  className={`sticky top-0  hover:bg-[#e7e7e7]`}
                >
                  <TableRow
                    id="dynamicTableHeadRow"
                    className={` top-0 bg-[#fafbfc]  hover:bg-[#fafbfc]`}
                  >
                    <TableHead className="bg-gray h-14 hover:bg-gray">
                      <div className="w-full text-[#404653] font-semibold">
                        {staticHeader}
                      </div>
                    </TableHead>
                    <TableHead className="bg-gray h-14 hover:bg-gray">
                      <Select
                        value={selectedColumn}
                        onValueChange={(value: string) => {
                          setSelectedColumn(value);
                        }}
                        onOpenChange={handleDropdownOpen}
                      >
                        <SelectTrigger className="h-4 border-none focus:ring-0 focus:outline-none  text-[15px] text-[#404653] font-semibold  bg-gray hover:bg-gray shadow-none  flex justify-center relative top-[7px]">
                         <div
                         className="overflow-x-auto whitespace-nowrap max-w-full sm:max-w-[150px]" style={{ maxWidth: '100%', }}
                         > <SelectValue placeholder="" /></div> 
                          <div className="ml-4">
                            {dropdownOpen ? (
                              <ChevronUpIcon className="h-4 w-full font-semibold" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-full font-semibold" />
                            )}
                          </div>
                        </SelectTrigger>
                        <SelectContent className="border-none border-[#FAFBFC] text-[#404653]  text-sm">
                          <SelectGroup className="">
                            {tableHeader
                              .filter(
                                (header) => header.id !== `${staticColunm}`
                              )
                              .map((header) => (
                                <SelectItem
                                  key={header.id}
                                  value={header.id}
                                  className="text-[#404653] hover:bg-[#E7F7ED]"
                                >
                                  {header.title}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody id="dynamicTableBodyMobile" className="w-full">
                  {tableData?.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      onClick={() => handleRowClick(row)}
                      className={`${sx}`}
                    >
                      <TableCell className="h-14 overflow-hidden whitespace-nowrap text-ellipsis max-w-[1rem]">
                        <div className="truncate pt-2 pb-2 pr-2 pl-2 ">
                          {/* {row[`${staticColunm}`]} */}
                          {renderCellContent(
                            tableHeader.find(
                              (header) => header.id === staticColunm
                            )?.selector
                              ? tableHeader.find(
                                  (header) => header.id === staticColunm
                                )?.selector!(row)
                              : row[`${staticColunm}`]
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="h-14 overflow-hidden whitespace-nowrap text-ellipsis max-w-[1rem]">
                        <div className={`text-center truncate pr-2 pl-2 pt-2 pb-2 `}>
                          {/* {row[selectedColumn]} */}
                          {renderCellContent(
                            tableHeader.find(
                              (header) => header.id === selectedColumn
                            )?.selector
                              ? tableHeader.find(
                                  (header) => header.id === selectedColumn
                                )?.selector!(row)
                              : row[selectedColumn]
                          )}
                        </div>
                      </TableCell>
                      {/* ${row[selectedColumn] === "Accepted"?"bg-error50 text-success600 pt-1 pb-1 pr-1 pl-1 rounded-xl w-24 relative ml-12 mr-12": row[selectedColumn] === "Declined"? 'text-error600 bg-error50 pt-1 pb-1 pr-1 pl-1 rounded-xl w-24 relative ml-12 mr-12 ': ""} */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paginations
              page={pageNumber + 1}
              totalPage={totalPages}
              handlePageChange={handlePageChange}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
