import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdOutlineDelete } from "react-icons/md";

interface ItemListProps {
    items: { name: string, amount: string }[];
    setItems: (items: { name: string, amount: string }[]) => void;
    handleDeleteItem: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, setItems, handleDeleteItem }) => (
    <>
        {items.map((item, index) => (
            <div key={index} id={`itemContainer${index}`} className="flex gap-5">
                <div className="grid gap-2 w-full">
                    <Input type="text" id={`itemInputField${index}`} name={`itemName-${index}`} placeholder="Item Name" className="p-4 focus-visible:outline-0 w-[231px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650" value={item.name} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].name = e.target.value;
                        setItems(newItems);
                    }}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger id={`itemSelectTrigger${index}`} className={'mt-0 mb-0 min-w-[78px]'}>
                                <SelectValue placeholder="NGN">NGN</SelectValue>
                            </SelectTrigger>
                            <SelectContent id={`itemSelectContent${index}`}>
                                <SelectItem value="NGN">NGN</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className={'flex justify-between gap-2 items-center'}>
                            <Input type="number" id={`itemAmount${index}`} name={`itemAmount-${index}`} placeholder="0.00" className="p-4 focus-visible:outline-0 w-[132px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.amount} onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].amount = e.target.value;
                                setItems(newItems);
                            }}/>
                            <MdOutlineDelete id={`deleteItemButton${index}`} className={'text-blue200 h-4 w-4 cursor-pointer'} onClick={() => handleDeleteItem(index)}/>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default ItemList;