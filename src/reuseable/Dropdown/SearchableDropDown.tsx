"use client";

import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Info } from "lucide-react";
import clsx from "clsx";
import {inter500} from '@/app/fonts'

export interface DropdownItem<T > {
    id: string | number;
    label: string;
    subLabel?: string;
    icon?: React.ReactNode;
    value?: T;
}

interface SearchableDropdownProps<T> {
    items: DropdownItem<T>[];
    onSelect?: (item: DropdownItem<T>) => void;
    placeholder?: string;
    showSearch?: boolean;
    footerNote?: string;
    widthClass?: string;
    renderItem?: (item: DropdownItem<T>) => React.ReactNode;
    placeholderStyle?: string,
    searchPlaceholder?:string,
}

const SearchableDropdown = <T,>({
                                    items,
                                    onSelect,
                                    placeholder = "Select an option",
                                    showSearch = true,
                                    footerNote,
                                    widthClass = "w-[18rem]",
                                    renderItem,
                                    placeholderStyle,
                                    searchPlaceholder,
                                }: SearchableDropdownProps<T>) => {
    const [search, setSearch] = React.useState("");
    const [selected, setSelected] = React.useState<DropdownItem<T> | null>(null);
    const [open, setOpen] = React.useState(false);

    const filteredItems = items.filter(
        (item) =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.subLabel?.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (item: DropdownItem<T>) => {
        setSelected(item);
        onSelect?.(item);
    };

    return (
        <DropdownMenu onOpenChange={setOpen} >
            <DropdownMenuTrigger id={`dropDown`+placeholder?.replace(' ', '') } data-testid={`dropDown`+placeholder?.replace(' ', '')} asChild>
                <button
                    className={clsx(
                        "flex justify-between items-center border border-[#D7D7D7] rounded-md px-3 py-2 text-sm text-gray-700 bg-white",
                        widthClass
                    )}
                >
                     <span data-testid={`placeHolder` + placeholder?.replace(' ', '' )} id={`placeHolder` + placeholder?.replace(' ', '' )} className={` ${placeholderStyle} `}>
                       {selected ? selected.label : placeholder}
                     </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} ${placeholderStyle} text-gray-500 `} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className={clsx(
                    "p-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[60vh] ",
                    widthClass
                )}
            >
                {showSearch && (
                    <div className="sticky top-0 bg-white pb-2">
                        <Input
                            id={`searchBar`}
                            data-testid={`searchBar`}
                            placeholder={ searchPlaceholder || `Search`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-sm"
                        />
                    </div>
                )}

                <div className="flex flex-col max-h-[48vh] max-w-[80vw] overflow-y-auto gap-1">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <DropdownMenuItem
                                id={'item' + index}
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                                {renderItem ? (
                                    renderItem(item)
                                ) : (
                                    <div className={` hover:bg-[#F2F2F2] hover:rounded-md px-2 py-1 max-w-full flex h-fit gap-2 w-full   `}>
                                        {item.icon && <span className={` mt-auto mb-auto `}>{item.icon}</span>}
                                        <div className="flex gap-2  flex-col">
                                            <span className={` ${inter500.className} break-normal text-sm`}>{item.label}</span>
                                            {item.subLabel && (
                                                <span className="text-xs break-normal text-gray-500">{item.subLabel}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="text-center text-sm text-gray-400 py-4">No results found</div>
                    )}
                </div>

                {footerNote && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-3 border-t pt-2">
                        <Info className="w-4 h-4 text-green-600" />
                        {footerNote}
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SearchableDropdown;

