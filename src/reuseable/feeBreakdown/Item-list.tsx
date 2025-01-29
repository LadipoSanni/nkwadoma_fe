'use client'
import React, {useState, useEffect} from 'react';
import {Input} from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {MdOutlineDelete} from "react-icons/md";
import CurrencySelectInput from '../Input/CurrencySelectInput';
import {NumericFormat} from 'react-number-format';

interface ItemListProps {
    items: { itemName: string, itemAmount: string, currency: string }[];
    setItems: (items: { itemName: string, itemAmount: string, currency: string }[]) => void;
    handleDeleteItem: (index: number) => void;
    setIsItemListValid: (isValid: boolean) => void;
    setTotalAmount: (total: number) => void;

}

const ItemList: React.FC<ItemListProps> = ({items, setItems, handleDeleteItem, setIsItemListValid, setTotalAmount}) => {
    const [errors, setErrors] = useState<string[]>([]);
    const selectCurrency = 'NGN';

    useEffect(() => {
        const total = items.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0);
        setTotalAmount(total);
    }, [items, setTotalAmount]);

    const handleCurrencyChange = (index: number, currency: string) => {
        const newItems = [...items];
        newItems[index].currency = currency || selectCurrency;
        setItems(newItems);
    };

    const validateText = (text: string) => {
        return /^(?=.*[a-zA-Z])([a-zA-Z0-9\s\-\/]+)$/.test(text);
    };


    const handleInputChange = (index: number, value: string) => {
        const newItems = [...items];
        const onlyNumbers = /^[0-9]+$/.test(value);
        const specialCharacters = /[^a-zA-Z0-9\s\-\/]/.test(value);

        if (onlyNumbers) {
            setErrors(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = 'Only numbers are not allowed';
                return newErrors;
            });
            setIsItemListValid(false);
        } else if (specialCharacters) {
            setErrors(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = 'Special characters are not allowed';
                return newErrors;
            });
            setIsItemListValid(false);
        } else if (validateText(value)) {
            newItems[index].itemName = value;
            setErrors(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = '';
                return newErrors;
            });
            setIsItemListValid(true);
        } else {
            setErrors(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = 'Use letters or numbers, and include at least one letter';
                return newErrors;
            });
            setIsItemListValid(false);
        }
        setItems(newItems);
    };    return (
        <>
            {items.map((item, index) => (
                <div key={index} id={`itemContainer${index}`} className="flex gap-5">
                    <div className="grid gap-2">
                        <Input type="text" id={`itemInputField${index}`} name={`itemName-${index}`}
                               placeholder="Item Name"
                               className="p-4 focus-visible:outline-0 md:w-[14.4375rem] w-[6.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
                               value={item.itemName} onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].itemName = e.target.value;
                            setItems(newItems);
                            handleInputChange(index, e.target.value)
                            // disabled={item.itemName === "Tuition"}
                            
                        }}
                        // disabled={item.itemName === "Tuition"}
                        readOnly={item.itemName === "Tuition"}
                        />

                        {errors[index] && <span className="text-[14px] text-red-500">{errors[index]}</span>}
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
                            <div
                                className={`flex justify-between gap-2 items-center ${
                                    errors[index] === 'Use letters or numbers, and include at least one letter'
                                        ? 'mb-12'
                                        : errors[index] === 'Special characters are not allowed' || errors[index] === 'Only numbers are not allowed'
                                            ? 'mb-7'
                                            : 'mb-0'
                                }`}>                                {/*<Input type="number" id={`itemAmount${index}`} name={`itemAmount-${index}`} placeholder="0.00" className="p-4 focus-visible:outline-0 w-[6.25rem] md:w-[8.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.itemAmount} onChange={(e) => {*/}
                                {/*    const newItems = [...items];*/}
                                {/*    newItems[index].itemAmount = e.target.value;*/}
                                {/*    setItems(newItems);*/}
                                {/*}}/>*/}
                                <NumericFormat
                                    id={`itemAmount${index}`}
                                    name={`itemAmount-${index}`}
                                    placeholder="0.00"
                                    className="p-4 focus-visible:outline-0 w-[6.25rem] md:w-[8.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    value={item.itemAmount}
                                    defaultValue="0.00"
                                    // onValueChange={(values) => {
                                    //     const newItems = [...items];
                                    //     newItems[index].itemAmount = values.value;
                                    //     setItems(newItems);
                                    // }}
                                    onValueChange={(values) => { const newItems = [...items]; const amount = values.value; 
                                         if (amount.length > 1 && amount.startsWith('0')) { 
                                            setErrors(prevErrors => { const newErrors = [...prevErrors]; newErrors[index] = 'Item amount cannot start with 0'; return newErrors; }); 
                                            setIsItemListValid(false); }
                                           else if (amount.length > 19) {
                                                setErrors(prevErrors => {
                                                    const newErrors = [...prevErrors];
                                                    newErrors[index] = 'Item amount cannot exceed quadrillion';
                                                    return newErrors;
                                                });setIsItemListValid(false); }
                                             else { newItems[index].itemAmount = amount; setItems(newItems); 
                                            setErrors(prevErrors => { const newErrors = [...prevErrors]; newErrors[index] = ''; 
                                            return newErrors; });
                                             setIsItemListValid(true); } 
                                            }}
                                    thousandSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                />
                               { item.itemName === "Tuition"? "" : <MdOutlineDelete id={`deleteItemButton${index}`}
                                                 className={'text-blue200 h-4 w-4 cursor-pointer'}
                                                 onClick={() => handleDeleteItem(index)}/>
                                }
                            </div>
                        </div>NumericFormat
                    </div>
                </div>
            ))}
        </>
    )
};

export default ItemList;