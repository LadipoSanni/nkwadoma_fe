import React from 'react';
import { TransactionItem } from './Transaction-items';
import Paginations from '../table/Pagination'; 
import GeneralEmptyState from '../emptyStates/General-emptystate';
import SkeletonForTransaction from '../Skeleton-loading-state/Skeleton-for-transaction';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import BackButton from "@/components/back-button";

export interface Transaction {
  date: string;
  description: string;
  status: string;
  type: string;
  amount: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  hasNextPage?: boolean;
  isLoading?: boolean;
  handleViewAll?:() => void
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  transactions, 
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  isLoading,
  handleViewAll
}) => {
  
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage-1);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full">
     
      { isLoading? <SkeletonForTransaction/> : transactions.length === 0? 
      <div>
     <GeneralEmptyState
      icon={MdOutlineAccountBalanceWallet}
      iconSize='1.7rem'
      iconContainerClass='bg-[#EDF0F3]'
      color='#A8A8A8'
      message={<div className='relative bottom-2 text-[#101828] font-medium'>
          Payment history will appear hear
      </div>}
     />
      </div> :
      Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <div key={date} className="mb-8">
          
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-[#212221] ">{date}</h3>
         { handleViewAll &&  <div className='underline text-meedlBlue underline-offset-[3px]'>
            <BackButton 
            id='transactionRouteButton'
            textColor={'meedlBlue'}
            text={'View all'} 
            iconBeforeLetters={false}
            handleClick={handleViewAll}
            className='font-medium text-[16px] mr-2 '
            sx='text-[20px]'
            isShow={false}
        />
            </div>}
          </div>
          
          <div className="rounded-lg bg-[#F9F9F9] px-8">
            {dateTransactions.map((transaction, index) => (
              <TransactionItem 
                key={`${date}-${index}`} 
                transaction={transaction} 
                isLast={index === dateTransactions.length - 1}
              />
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="mt-6 ">
          <Paginations
            page={currentPage + 1}
            totalPage={totalPages}
            handlePageChange={handlePageChange}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </div>
      )}
    </div>
  );
};