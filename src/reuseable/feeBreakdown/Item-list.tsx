import React from 'react';
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdOutlineDelete } from "react-icons/md";
import CurrencySelectInput from '../Input/CurrencySelectInput';

interface ItemListProps {
    items: { itemName: string, itemAmount: string,currency: string }[];
    setItems: (items: { itemName: string, itemAmount: string,currency: string }[]) => void;
    handleDeleteItem: (index: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, setItems, handleDeleteItem }) => {

    const selectCurrency = 'NGN';

    const handleCurrencyChange = (index: number, currency: string) => {
        const newItems = [...items];
        newItems[index].currency = currency || selectCurrency;
        setItems(newItems);
    };

   return (
    <>
        {items.map((item, index) => (
            <div key={index} id={`itemContainer${index}`} className="flex gap-5">
                <div className="grid gap-2">
                    <Input type="text" id={`itemInputField${index}`} name={`itemName-${index}`} placeholder="Item Name" className="p-4 focus-visible:outline-0 md:w-[14.4375rem] w-[6.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650" 
                    value={item.itemName} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].itemName = e.target.value;
                        setItems(newItems);
                    }}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex gap-2">
                        {/* <Select>
                            <SelectTrigger id={`itemSelectTrigger${index}`} className={'mt-0 mb-0 min-w-[78px]'}>
                                <SelectValue placeholder="NGN">NGN</SelectValue>
                            </SelectTrigger>
                            <SelectContent id={`itemSelectContent${index}`}>
                                <SelectItem value="NGN">NGN</SelectItem>
                            </SelectContent>
                        </Select> */}
                        <CurrencySelectInput
                                selectedcurrency={item.currency || selectCurrency} 
                                setSelectedCurrency={(currency) => handleCurrencyChange(index, currency)}
                                className="mt-0 mb-0 min-w-[78px] h-[3.10rem]"
                            />
                        <div className={'flex justify-between gap-2 items-center'}>
                            <Input type="number" id={`itemAmount${index}`} name={`itemAmount-${index}`} placeholder="0.00" className="p-4 focus-visible:outline-0 w-[6.25rem] md:w-[8.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.itemAmount} onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].itemAmount = e.target.value;
                                setItems(newItems);
                            }}/>
                            <MdOutlineDelete id={`deleteItemButton${index}`} className={'text-blue200 h-4 w-4 cursor-pointer'} onClick={() => handleDeleteItem(index)}/>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
)
};

export default ItemList;