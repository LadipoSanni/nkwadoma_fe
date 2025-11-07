import React from 'react';
import { TransactionItem } from './Transaction-items';
import Paginations from '../table/Pagination'; 
import GeneralEmptyState from '../emptyStates/General-emptystate';
import SkeletonForTransaction from '../Skeleton-loading-state/Skeleton-for-transaction';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import BackButton from "@/components/back-button";
import { InfiniteScrollProps } from '@/types/Component.type';
import InfiniteScroll from "react-infinite-scroll-component";

export interface Transaction {
  date: string;
  description: string;
  status: string;
  type: string;
  amount: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  // currentPage?: number;
  // totalPages: number;
  // onPageChange?: React.Dispatch<React.SetStateAction<number>>;
  // hasNextPage?: boolean;
  isLoading?: boolean;
  handleViewAll?:() => void;
  className?: string;
  style?: React.CSSProperties; 
<<<<<<< HEAD
  infinityScroll?: InfiniteScrollProps;
  infinityScrollHeight?: string
=======
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  transactions, 
  // currentPage,
  // totalPages,
  // onPageChange,
  // hasNextPage,
  isLoading,
  handleViewAll,
  className,
<<<<<<< HEAD
  infinityScroll,
  style,
  infinityScrollHeight
=======
  style
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
}) => {
  
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
  //   onPageChange(newPage-1);
  // };

  // const handleNextPage = () => {
  //   if (hasNextPage) {
  //     onPageChange((prevPage) => prevPage + 1);
  //   }
  // };

<<<<<<< HEAD
  // const handlePreviousPage = () => {
  //   if (currentPage > 0) {
  //     onPageChange((prevPage) => prevPage - 1);
  //   }
  // };

  const renderTransactionContent = () => {
    const groupedEntries = Object.entries(groupedTransactions);
    
    return groupedEntries.map(([date, dateTransactions]) => (
      <div key={date} className="mb-8">
        <div className="mb-3 flex justify-between items-center ">
          <h3 className="text-[#212221] ">{date}</h3>
          {handleViewAll && (
            <div className='underline text-meedlBlue underline-offset-[3px]'>
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
            </div>
          )}
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
    ));
=======
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange((prevPage) => prevPage - 1);
    }
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
  };

  return (
    <div className={`w-full `}>
<<<<<<< HEAD
      <div className={`flex flex-col ${className}`} style={style}>
        {isLoading ? (
          <SkeletonForTransaction/>
        ) : transactions.length === 0 ? (
          <div>
            <GeneralEmptyState
              icon={MdOutlineAccountBalanceWallet}
              iconSize='1.7rem'
              iconContainerClass='bg-[#F9FAFB]'
              color='#A8A8A8'
              message={<div className='relative bottom-2 text-[#4D4E4D] font-medium'>
                Payment history will appear here
              </div>}
            />
=======
     <div className={`flex flex-col ${className}`} style={style}>
      { isLoading? <SkeletonForTransaction/> : transactions.length === 0? 
      <div>
     <GeneralEmptyState
      icon={MdOutlineAccountBalanceWallet}
      iconSize='1.7rem'
      iconContainerClass='bg-[#F9FAFB]'
      color='#A8A8A8'
      message={<div className='relative bottom-2 text-[#4D4E4D] font-medium'>
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
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
          </div>
        ) : (
          <div>
            {infinityScroll ? (
              <InfiniteScroll
                dataLength={transactions.length}
                next={infinityScroll.loadMore}
                hasMore={infinityScroll.hasMore}
                loader={infinityScroll.loader ? <SkeletonForTransaction /> : null}
                height={infinityScrollHeight || "60vh"}
                className="w-full"
              >
                {renderTransactionContent()}
              </InfiniteScroll>
            ) : (
              renderTransactionContent()
            )}
          </div>
<<<<<<< HEAD
        )}
      </div>

      {/* {totalPages > 1 && (
=======
        </div>
      ))}
      </div>

      {totalPages > 1 && (
>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
        <div className="mt-auto">
          <Paginations
            page={currentPage + 1}
            totalPage={totalPages}
            handlePageChange={handlePageChange}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </div>
      )} */}
    </div>
  );

};