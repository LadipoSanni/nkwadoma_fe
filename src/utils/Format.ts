import { ReactNode } from "react";
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

