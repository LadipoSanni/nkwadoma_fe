import { ReactNode } from "react";
import dayjs from "dayjs";
import moment from "moment";

interface TableRowData {
  [key: string]: string | number | null | ReactNode | object;
}

export const formatAmount = (price: TableRowData[keyof TableRowData], showAsWholeNumber?: boolean) => {
  if (typeof price === "string" || typeof price === "number") {
    const priceStr = typeof price === "number" ? price.toString() : price;

    const numericPrice = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));

    if (!isNaN(numericPrice)) {
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: showAsWholeNumber ? 0 : 2,
      }).format(numericPrice);

      return "₦" + formattedAmount.replace("NGN", "").trim();
    }
  }

  return "₦0.00";
};

export const formateDigits = (digit:  number) => {

    if (!isNaN(digit)) {
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
      }).format(digit);
      return  formattedAmount.replace("NGN", "").trim();
    }


  return "0.00";
}

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

export const validateNumber =
  (field: string, setFieldValue: (field: string, value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");
    setFieldValue(field, validValue);
  };

// const value = e.target.value;
//                         if (/^(?!0)\d*$/.test(value)) {
//                             setFieldValue("size", value);
//                         }

export const formatNumberOnBlur = (
  field: string,
  setFieldValue: (field: string, value: string) => void,
  value: string
) => {
  const trimmedValue = value.replace(/^0+/, "");
  const numberValue = parseFloat(trimmedValue);
  const formattedValue = isNaN(numberValue)
    ? ""
    : numberValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  setFieldValue(field, formattedValue);
};

export const formatAmount2 = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const validateText =
  (field: string, setFieldValue: (field: string, value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validValue = value.replace(
      /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-\/\s]/g,
      ""
    );
    setFieldValue(field, validValue);
  };

export function formatMonthInDate(dateStr: ReactNode) {
  if (dateStr == null) {
    return "null";
  }

  const formats = ["DD-MM-YYYY", "YYYY-MM-DD"];
  let date;
  for (const format of formats) {
    if (typeof dateStr !== "string") {
      dateStr = dateStr.toString();
    }
    date = moment(dateStr.toString(), format, true);
    if (date.isValid()) {
      return date.format("DD MMM, YYYY");
    }
  }
  return "null";
}

export const validatePositiveNumber =
  (
    field: string,
    setFieldValue: (field: string, value: string) => void,
    maxFigure: number,
    minFigure: number
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (
      value !== "" &&
      parseInt(value, 10) >= minFigure &&
      parseInt(value, 10) <= maxFigure
    ) {
      setFieldValue(field, value);
    } else if (value === "") {
      setFieldValue(field, "");
    }
  };

  export const validatePositiveNumberWithIndexNumbers = (
    field: string,
    setFieldValue: (field: string, value: string) => void,
    maxFigure: number,
    minFigure: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

  value = value.replace(/[^0-9.]/g, "");

  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + "." + parts[1].substring(0, 2);
  }

  const parsedValue = parseFloat(value);
  if (
    value !== "" &&
    !isNaN(parsedValue) &&
    parsedValue >= minFigure &&
    parsedValue <= maxFigure
  ) {
    setFieldValue(field, value);
  } else if (value === "") {
    setFieldValue(field, "");
  }
  };
  

export const unformatAmount = (value: string) => {
  const array = Array.from(value);
  array.filter((item, index) => {
    if (item === ",") {
      array[index] = "";
    }
  });
  let newArray: string = "";
  array.forEach((item) => {
    newArray += item;
  });
  return newArray;
};

export const validateNumberLimit =
  (
    field: string,
    setFieldValue: (field: string, value: string) => void,
    setFieldError: (field: string, message: string | undefined) => void,
    maxLength: number,
    errorMessage: string
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const regex = /^[1-9][0-9]{0,2}$/;

    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    if (regex.test(value)) {
      setFieldValue(field, value);
      setFieldError(field, undefined);
    } else {
      setFieldValue(field, "");
      setFieldError(
        field,
        errorMessage
      );
    }
  };

  export function formatToTwoDecimals(num: TableRowData[keyof TableRowData]) {
    if (num === null || num === undefined) {
      return '0.00'; 
    }
  
    if (typeof num !== 'number' && typeof num !== 'string') {
      throw new Error('Numeric value required');
    }
  
    const numberValue = typeof num === 'string' ? parseFloat(num) : num;
    
    if (isNaN(numberValue)) {
      throw new Error('Invalid number input');
    }
  
    const formatted = parseFloat(numberValue.toFixed(2));
    
    return formatted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

//   interface NestedData {
//     body?: TableRowData[];
// }

 
// function sortOrganizationsByField(data: TableRowData, field: string) {
  
//   const nestedData = data?.data as NestedData;
//   const body = nestedData?.body?.slice() ?? [];

//   if (!Array.isArray(body)) {
//       throw new Error("The body property is not an array");
//   }

//   return body.sort((a: TableRowData, b: TableRowData) => {
//       const dateA = new Date(a[field] as string).getTime();
//       const dateB = new Date(b[field] as string).getTime();
//       return dateB - dateA;
//   });
// }



