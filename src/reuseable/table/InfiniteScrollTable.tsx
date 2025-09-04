'use client'
import React, { useState } from 'react';

import {
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    TableHeader,
} from "@/components/ui/table";
import TableContainer from "./TableContainer";
import Styles from "@/reuseable/table/styles.module.css";
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon} from "@radix-ui/react-icons";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | object;
}
interface ColumnProps<T> {
    title: string | React.ReactNode;
    id: string;
    selector?: (row: T) => React.ReactNode;
    sortable?: boolean;
}

interface Props<T extends TableRowData> {
    tableData: T[];
    tableHeader: ColumnProps<T>[];
    tableHeight?: number;
    staticHeader: string;
    staticColumn: string;
}

function InfiniteScrollTable <T extends TableRowData>  ({
    tableHeader,
    tableData,
    tableHeight,
    staticHeader,
    staticColumn,
                                                        }:Props<T>)  {
    const [selectedColumn, setSelectedColumn] = useState(tableHeader[1].id);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleDropdownOpen = () => setDropdownOpen(!dropdownOpen);


    // const renderCellContent = (
    //     value:
    //         | string
    //         | number
    //         | boolean
    //         | React.ReactNode
    //         | object
    //         | null
    //         | undefined
    // ) => {
    //     if (React.isValidElement(value)) {
    //         return value;
    //     }
    //     if (typeof value === "object" && value !== null) {
    //         return JSON.stringify(value);
    //     }
    //     return value;
    // };
    const renderCellContent = (column: ColumnProps<T>, row: T) => {
        const value = column?.selector ? column?.selector(row) : row[column.id];
        // if (column.id === "status" && typeof value === "string") {
        //     return (
        //         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(value)}`}>{value}</span>
        //     );
        // }
        if (React.isValidElement(value)) return value;
        if (typeof value === "object" && value !== null) return JSON.stringify(value);
        return value;
    };

    return (
        <div
            id={'infiniteScrollTableComponent'}
            data-testid={'infiniteScrollTableComponent'}
            className={``}
        >
            <TableContainer
                id={'webTableContainer'}
                data-testid={'webTableContainer'}
                style={{ height: `${tableHeight}vh`, overflow: "scroll" }}
                className={` md:grid hidden lg:grid rounded-md border-none `}
            >
                <Table>
                    <TableHeader>
                        <TableRow
                            className={` sticky top-0     bg-[#F0F2F4]  hover:bg-[#fafbfc]`}

                            // className={` flex justify-between py-4  hover:bg-[#F0F2F4] bg-[#F0F2F4] `}
                        >
                            {tableHeader.map((column) => (
                                <TableHead
                                    key={column.id}
                                    id={`dynamicTableHeadCell${column.id}`}
                                    className="bg-[#F0F2F4] py-4 h-fit  hover:bg-[#F0F2F4]"
                                >
                                    <div
                                        id={`dynamicTableHeadCellDiv${column.id}`}
                                        className={`${Styles.tableHeaderItem} `}
                                    >
                                        {column.title}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.map((row, rowIndex) => (
                            <TableRow
                                id={`dynamicTableBodyRow${rowIndex}`}
                                data-testid={`dynamicTableBodyRow${rowIndex}`}
                                key={rowIndex}
                                // onClick={() => handleRowClick(row)}
                                // className={`${sx}`}
                            >
                                {tableHeader.map((column) => (
                                    <TableCell
                                        // onClick={() => handleRowClick(row)}
                                        key={`${column.id}${rowIndex} `}
                                        id={`dynamicTableCell${column.id}${rowIndex}`}
                                        data-testid={`dynamicTableCell${column.id}${rowIndex}`}
                                        // className={`px-[12px] py-[10px] text-[#101828] ${column.id === selectedColumn? 'bg-[#fafbfc]' : ''}`}
                                        // className={`h-1 ${
                                        //     isLastPage ? "border-b border-solid " : ""
                                        // } ${tableCellStyle} overflow-hidden whitespace-nowrap text-ellipsis max-w-[80px]  `}
                                    >
                                        <div
                                            id={`dynamicTableBodyCellDiv${rowIndex}${column.id}`}
                                            // className={`${Styles.tableBodyItem} ${tableStyle}  truncate `}
                                            className={` py-3 `}
                                            // style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "200px",  }}
                                        >
                                            {/* {column.selector ? column.selector(row) : row[column.id]}*/}
                                            {/*{renderCellContent(*/}
                                            {/*    column.selector*/}
                                            {/*        ? column.selector(row)*/}
                                            {/*        : row[column.id]*/}
                                            {/*)}*/}
                                            {renderCellContent(column, row)}

                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer
                id={'mobileTableContainer'}
                data-testid={'mobileTableContainer'}
                className={`md:hidden grid lg:hidden rounded-md border-none  `}
                style={{ height: `${tableHeight}vh`, overflow: "auto" }}

            >
                    <Table id="dynamicTableMobile" className="w-full">
                        <TableHeader
                            id="dynamicTableHeadMobile"
                            className={`sticky top-0  hover:bg-[#e7e7e7]`}
                        >
                            <TableRow className={` h-fit py-6`}>
                                <TableHead
                                    id={staticHeader?.toString()} data-testid={staticHeader?.toString()}
                                    className={` f mt-auto mb-auto py-4  text-[#545F7D] text-[16px]`}
                                >{staticHeader}</TableHead>
                                <TableHead>
                                    <Select
                                        value={selectedColumn}
                                        onValueChange={(val: string) => setSelectedColumn(val)}
                                        onOpenChange={handleDropdownOpen}
                                    >
                                        <SelectTrigger className={`h-4 border-none focus:border-none focus:ring-0 f mt-auto mb-auto text-[#545F7D] text-[16px]`}>
                                            <div className="truncate max-w-[120px]">
                                                <SelectValue
                                                    className={` f mt-auto mb-auto text-[#545F7D] text-[16px]`} placeholder="Select" />
                                            </div>
                                            <div className="ml-4">
                                                {dropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup >
                                                {tableHeader?.filter((header) => header.id !== staticColumn).map((header) => (
                                                    <SelectItem
                                                        id={header.title?.toString()} data-testid={header.title?.toString()}
                                                        className={`  mt-auto mb-auto text-[#545F7D] text-[16px]`} key={header.id} value={header.id}>{header.title}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableHead>
                            </TableRow>

                        </TableHeader>
                        <TableBody id="dynamicTableBodyMobile" className="w-full">
                            {tableData?.map((row, rowIndex) => {

                                const staticColumnDef = tableHeader.find((h) => h.id === staticColumn);
                                const selectedColumnDef = tableHeader.find((h) => h.id === selectedColumn);

                                return (
                                    <TableRow
                                        key={rowIndex}
                                        className={`h-fit py-3 text-[#545F7D] text-[14px] `}
                                        // onClick={() => handleRowClick(String(row?.id))}
                                    >
                                        <TableCell className="truncate px-4 py-2">
                                            {staticColumnDef ? renderCellContent(staticColumnDef, row) : null}
                                        </TableCell>
                                        <TableCell className="truncate px-4 py-4">
                                            {selectedColumnDef ? renderCellContent(selectedColumnDef, row) : null}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
            </TableContainer>
        </div>
    );
};

export default InfiniteScrollTable;