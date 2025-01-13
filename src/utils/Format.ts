import {ReactNode} from "react";
import dayjs from "dayjs";

interface TableRowData {
    [key: string]: string | number | null | ReactNode | object;
}

export const formatAmount = (price: TableRowData[keyof TableRowData]) => {

    if (typeof price === "string" || typeof price === "number") {
        const priceStr = typeof price === "number" ? price.toString() : price;

        const numericPrice = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(numericPrice)) {
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
            }).format(numericPrice);

            return "₦" + formattedAmount.replace("NGN", "").trim();
        }
    }

    return "₦0.00";
};


export const formatDate = (
    date: ReactNode,
    inputFormat = "YYYY:MM:DD",
    outputFormat = "DD-MM-YYYY"
) => {
    if (typeof date === "string" && date.trim()) {
        const finalDate = dayjs(date, inputFormat).format(outputFormat);
        return finalDate;
    }
    return "null";
};

export const validateNumber = (field: string, setFieldValue: (field: string, value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    setFieldValue(field, validValue);
};

// const value = e.target.value;
//                         if (/^(?!0)\d*$/.test(value)) {
//                             setFieldValue("size", value);
//                         }

export const formatNumberOnBlur = (field: string, setFieldValue: (field: string, value: string) => void, value: string) => {
    const trimmedValue = value.replace(/^0+/, '');
    const numberValue = parseFloat(trimmedValue);
    const formattedValue = isNaN(numberValue) ? '' : numberValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    setFieldValue(field, formattedValue);
};

export const validateText = (field: string, setFieldValue: (field: string, value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validValue = value.replace(/[^a-zA-Z\s]/g, '');
    setFieldValue(field, validValue);
};
export const formatValueWithComma = (e: any) => {
    const numericValue = e?.target?.value?.replace(/\D+/g, '');
    return numericValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAmount2 = (amount: number): string =>{
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

