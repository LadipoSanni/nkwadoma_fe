import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumericFormat } from "react-number-format";

interface InitialItemProps {
  initialItemAmount: string;
  setInitialItemAmount: (amount: string) => void;
}

const InitialItem: React.FC<InitialItemProps> = ({ initialItemAmount, setInitialItemAmount }) => {
    
    return (
  <div id="initialItemContainer" className="flex gap-5">
    <div className="grid gap-2">
      <Label htmlFor={`itemName`} className="block text-sm font-medium text-labelBlue">Item Name</Label>
      <Input type="text" id={`itemName`} name={`itemName`} placeholder="Item Name" value="Tuition" readOnly className="bg-grey105 p-4 focus-visible:outline-0 md:w-[14.4375rem] w-[6.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.20rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor={`itemAmount`} className="block text-sm font-medium text-labelBlue">Item Amount</Label>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger id="initialItemSelectTrigger" className={'bg-grey105 mt-0 mb-0 min-w-[78px] h-[3.20rem]'}>
            <SelectValue placeholder="NGN">NGN</SelectValue>
          </SelectTrigger>
          {/* <SelectContent id="initialItemSelectContent">
            <SelectItem value="NGN">NGN</SelectItem>
          </SelectContent> */}
        </Select>
        <NumericFormat
          id={`itemAmount-`}
          name={`itemAmount`}
          placeholder="0.00"
          className="bg-grey105 p-4 focus-visible:outline-0 w-[6.25rem] md:w-[8.25rem] shadow-none focus-visible:ring-transparent rounded-md h-[3.20rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
          thousandSeparator=","
          decimalScale={2}
          fixedDecimalScale={true}
          value={initialItemAmount}
          onValueChange={(values) => setInitialItemAmount(values.value)}
        />
      </div>
    </div>
  </div>
);
}
export default InitialItem;