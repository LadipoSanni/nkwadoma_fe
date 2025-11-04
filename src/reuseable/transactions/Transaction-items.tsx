
import React from 'react';
import { formatAmount } from '@/utils/Format';
import { inter } from '@/app/fonts';

export interface Transaction {
  date: string;
  description: string;
  status: string;
  type: string;
  amount: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  isLast?: boolean
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction,isLast }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) { 
      case 'successful':
        return 'text-[#045620] bg-[#E6F2EA] ';
      case 'failed':
        return 'text-[#C1231D] bg-[#FBE9E9] ';
      case 'pending':
        return 'text-[#AD7311] bg-[#FEF6E8] ';
      default:
        return '';
    }
  };

  const getAmountColor = (status: string) => {
    switch (status.toLowerCase()) { 
      case 'successful':
        return 'text-[#045620]';
      case 'failed':
        return 'text-[#D42620]';
      case 'pending':
        return 'text-[#045620]';
      default:
        return '';
    }
  };

  return (
    <div className={`flex justify-between items-start py-4 ${!isLast? "border-b border-solid rounded-b-md border-[#D7D7D7]" : "border-none"}   ${inter.className}`}>
      <div className="flex-1">
        <p className="text-[#212221] font-normal text-[14px]">{transaction.description}</p>
        <p className={`w-fit px-2 rounded-xl font-normal text-[14px] mt-1 ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[#212221] font-normal text-[12px]">{transaction.type}</p>
        <p className={` font-medium ${getAmountColor(transaction.status)}`}>{formatAmount(transaction.amount)}</p>
      </div>
    </div>
  );
};