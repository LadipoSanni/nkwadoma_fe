"use client"
import React,{ReactNode,useEffect, useState } from 'react'
import SearchInput from '@/reuseable/Input/SearchInput'
import {inter} from "@/app/fonts"
import { Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notificationMockData } from '@/utils/Notification_mock-data';
import { getPaginatedData } from '@/utils/Mock-paginated-data';
import NotificationButton from '@/reuseable/buttons/Notification-button';
import EmptyState from '@/reuseable/emptyStates/TableEmptyState';
import  DeleteNotification  from '@/reuseable/details/DeleteCohort';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { BellIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';


interface Props{
    children: ReactNode
}

interface notificationProps{
    id: string,
    type: string,
    subtitle: string,
    message: string,
    read: boolean,
    senderName: string,
    senderEmail: string;
    timeSent?: string;
    receiverName?: string
    callToActionRequired?: boolean
}

function NotificationLayout({children}: Props) {
       const [searchTerm, setSearchTerm] = useState('');
       const [selectAll, setSelectAll] = useState(false);
       const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
       const [pageNumber,setPageNumber] = useState(0)
       const pageSize = 10
       const [getPaginatedDatas, setPaginatedData] = useState<notificationProps[]>([])
       const [hasNextPage,setHasNextPage] = useState(false)
       const [totalItem, setTotalItem] = useState(0)
       const [isDeleteOpen, setIsDeleteOpen] = useState(false);
       const router = useRouter();

       useEffect(()=> {
           const paginated = getPaginatedData(pageNumber, pageSize, notificationMockData);
            setPaginatedData(paginated.notifications)
            setPageNumber(paginated.pageNumber)
            setHasNextPage(paginated.hasNextPage)
            setTotalItem(paginated.totalItems)
            console.log("The paginated data: ",paginated)
         },[pageNumber])

        
         const handleCheckedRow = (id: string) => {
            setSelectedRows((prevSelected) => {
              const newSelected = new Set(prevSelected);
              if (newSelected.has(id)) {
                newSelected.delete(id);
              } else {
                newSelected.add(id);
              }
              return newSelected;
            });
          };
        
        
           const handleSelectAllChange = () => {
               if(selectAll){
                setSelectedRows(new Set());
               }else {
                const allRowIndexes: Set<string> = new Set();
                getPaginatedDatas?.forEach((data) => allRowIndexes.add(String(data.id)));
                setSelectedRows(allRowIndexes);
              }
              setSelectAll(!selectAll);
           }

           console.log("The selected row: ",selectedRows)

           const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchTerm(event.target.value);
                  };
               const handleLeftChange = () => {
                 if (pageNumber > 0) {
                   setPageNumber(pageNumber - 1);
                 }
               }
           
               const handleRightChange = () => {
                 if (hasNextPage) {
                   setPageNumber(pageNumber + 1);
                 }
               }
           
               const trackCountFirst = pageNumber * pageSize + 1;
               const trackCountLast = Math.min((pageNumber + 1) * pageSize, totalItem);

               const handleDeleteOpen = () =>{
                setIsDeleteOpen(true)
            }
        
            const handleDeleteNotification = () => {
        
            }

            const handleTabClick = (id: string) => {
                router.push(`/notifications/${id}`);
              };
            
           

  return (
    <div className={`w-full h-full md:flex ${inter.className}`}>
     <div className='md:border-r  lg:min-w-[28.125rem]'>
      {
        getPaginatedDatas.length === 0? (
        <div className='relative bottom-24 top-24 '>
          <EmptyState
           icon={() => (
            <BellIcon
            height={"25px"}
            width={"25px"}  
            />
           )}
           name='Notification'
           condition={true}
           notification={true}
           message='When you recieve a notification,it will appear here'
          />
        </div>
      ) : (
          <div>
        <div className='md:px-3 md:pr-7'>
        <SearchInput
              id={'ProgramSearchInput'}
               value={searchTerm}
               onChange={handleSearchChange}
               style='md:w-full py-1'
          />
        </div>
        <div className='flex justify-between items-center md:pr-7 mb-3 mt-7 md:px-3'>
        <div className="flex items-center">
            <input
               type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              id={`selectAll`}
              className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md mr-2 opacity-60`}
            />
            <span >All Notifications</span>
          </div>
          <div>
            <button 
            disabled={selectedRows.size === 0} 
            className={selectedRows.size === 0? "cursor-none " : "cursor-pointer "}
            onClick={handleDeleteOpen}
            >
              <Trash2 
              color={selectedRows.size > 0 ? '#D42620' : '#B6BCCA'}
              className={`w-full  h-[14px] `}
              
              />
            </button>
          </div>
        </div>
         <div className='md:max-h-[60vh] max-h-[58vh]  overflow-y-auto'>
          <Tabs
          orientation="vertical" 
          >
          <TabsList 
          className="flex-col items-start  p-0 rounded-none h-full  w-full bg-white"

          >
          {
            getPaginatedDatas.map((notification, index)=> (
              <div key={index} className='flex items-center w-full'>
        
                <div className='flex-1 border-t '>
                  <TabsTrigger 
                  value={notification.type} className={`w-full py-3  data-[state=active]:bg-[#F9F9F9] flex justify-between px-0 rounded-none`}
                onClick={() => handleTabClick(notification.id)}
                  >
                  <div className='flex md:px-3 cursor-pointer' >
                  <div
                  className='mr-2' 
                  
                  >
                  <input 
               type="checkbox"
               id='uniqueCheck'
               className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md  opacity-60 bg-white`}
               onChange={(e) => {
                e.stopPropagation();
                handleCheckedRow(notification.id)
            }}
               checked={selectedRows.has(notification.id)}
                />
                </div>
                <div className='flex-col flex items-start'>
                  <div className="text-[14px] font-medium text-[#212221] ">{notification.type}</div>
                <div className='font-thin'>{notification.subtitle}</div>
                </div>
                  
                  </div>
                  <div className='mr-3'>
                    {
                      notification.read === false?
                   <div className='text-5xl text-[#06792D]'>.</div>
                   : ""
                    }
                  </div>
                  
                </TabsTrigger>
                </div>
              
              </div>
            ))
          }
          </TabsList>
          </Tabs>
          </div>   
          <div className='border-t flex justify-end'>
          <NotificationButton
            totalItem={totalItem}
            handleLeftChange={handleLeftChange}
            handleRightChange={handleRightChange}
            trackCountFirst={trackCountFirst}
            trackCountLast={trackCountLast}
            pageNumber={pageNumber}
            hasNextPage={hasNextPage}
            style='mt-4 px-4'
          />
            </div> 
            </div> )
              }
            </div>
            <div className='px-5 w-full flex-grow hidden md:block'>
                {children}
            </div>
            <div>
          <TableModal
           isOpen={isDeleteOpen}
           closeOnOverlayClick={true}
           closeModal={()=> setIsDeleteOpen(false)}
           width='auto'
           icon={Cross2Icon}
          >
           <DeleteNotification
              setIsOpen={() => setIsDeleteOpen(false)}
              headerTitle='notification'
              title="notification"
              handleDelete={handleDeleteNotification}
              id='1'
           />
          </TableModal>
        </div> 
    </div>
  )
}

export default NotificationLayout