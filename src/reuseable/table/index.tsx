
import React, {useState, useEffect, ElementType, ReactNode} from "react";
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
import Paginations from "./TablePagination";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
  import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarTrigger,
    MenubarContent,
    MenubarMenu,
    MenubarItem,
} from "@/components/ui/menubar";
import SkeletonForTable from "../Skeleton-loading-state/Skeleton-for-table";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";

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
    handleRowClick: (row: string | T | object | React.ReactNode) => void;
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
    icon?: ElementType;
    optionalFilterName?: string;
    optionalRowsPerPage?: number;
    tableCellStyle?: string;
    condition?: boolean;
    //   totalPages?: number;
    isLoading?: boolean;
    mobileTableHeader?: ColumnProps<T>;
}

function Tables<T extends TableRowData>({
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

                                            optionalRowsPerPage = 7,
                                            tableCellStyle,
                                            isLoading,
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

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
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
            return capitalizeFirstLetters(JSON.stringify(value));
        }

        return value;
    };

    const paginatedData = tableData?.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );
    const totalPages = Math.ceil(tableData?.length / rowsPerPage);
    const isLastPage = page === totalPages;

    return (
        <div id="loanProductTableContainer" className={`w-[100%] `}>
            {isLoading ? (
                <SkeletonForTable />
            ) : (
                <div>
                    <div
                        id="loanProductTableBorder"
                        className="border-[1px] border-b-[#D0D5DD] border-[#D0D5DD] border-solid rounded-md hidden md:block "
                    >
                        <TableContainer
                            id="loanProductTableScrollbar"
                            style={{ height: `${tableHeight}vh` }}
                            className={` `}

                        >
                            <Table id="dynamicTable" className="">
                                <TableHeader
                                    id="dynamicTableHead"
                                    className={`bg-[#F0F2F4] sticky top-0   hover:bg-[#F0F2F4]`}
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
                                    {paginatedData?.map((row, rowIndex) => (
                                        <TableRow
                                            id={`dynamicTableBodyRow${rowIndex}`}
                                            key={rowIndex}
                                            className={`${sx}`}
                                        >
                                            {tableHeader.map((column) => (
                                                <TableCell
                                                    onClick={() => handleRowClick(row?.id)}
                                                    key={`${column.id}${rowIndex} `}
                                                    id={`dynamicTableCell${column.id}${rowIndex}`}
                                                    className={`h-1 ${
                                                        isLastPage ? "border-b border-solid " : ""
                                                    } ${tableCellStyle} overflow-hidden whitespace-nowrap text-ellipsis max-w-[140px]  `}
                                                >
                                                    <div
                                                        id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`}
                                                        className={`${Styles.tableBodyItem} ${tableStyle}  truncate pt-2 pb-2 pr-2 `}
                                                    >
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
                            page={page}
                            rowsPerPage={rowsPerPage}
                            tableData={tableData}
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
                                    className={` hover:bg-[#e7e7e7] sticky top-0 `}
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
                                    {paginatedData?.map((row, rowIndex) => (
                                        <TableRow
                                            key={rowIndex}
                                            onClick={() => handleRowClick(row?.id)}
                                            className={`${sx}`}
                                        >
                                            <TableCell className="h-14 overflow-hidden whitespace-nowrap text-ellipsis max-w-[50px]">
                                                <div className="truncate pt-2 pb-2 pr-2 pl-2 ">
                                                    {renderCellContent(
                                                        tableHeader.find(
                                                            (header) => header.id === staticColunm
                                                        )?.selector
                                                            ? tableHeader.find(
                                                                (header) => header.id === staticColunm
                                                            )?.selector!(row)
                                                            : (row[`${staticColunm}`])
                                                    )}
                                                </div>
                                            </TableCell>

                                            <TableCell className="h-14 overflow-hidden whitespace-nowrap text-ellipsis max-w-[50px]">
                                                <div className={`text-center truncate mt-auto mb-auto `}>
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
                </div>
            )}
        </div>
    );
}

export default Tables;