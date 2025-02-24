"use client"
import React, { useEffect, useState } from 'react'
import SearchInput from '@/reuseable/Input/SearchInput'
import {inter} from "@/app/fonts"
import { Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notificationMockData } from '@/utils/Notification_mock-data';
import { getPaginatedData } from '@/utils/Mock-paginated-data';
import NotificationButton from '@/reuseable/buttons/Notification-button';
import { Button } from '@/components/ui/button';
import EmptyState from '@/reuseable/emptyStates/TableEmptyState';
import { FileText } from 'lucide-react';
import  DeleteNotification  from '@/reuseable/details/DeleteCohort';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { BellIcon } from '@radix-ui/react-icons';



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

function Notification() {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectAll, setSelectAll] = useState(false);
   const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
   const [activeTab, setActiveTab] = useState<string | undefined>("");
   const [pageNumber,setPageNumber] = useState(0)
   const pageSize = 10
   const [getPaginatedDatas, setPaginatedData] = useState<notificationProps[]>([])
   const [hasNextPage,setHasNextPage] = useState(false)
   const [totalItem, setTotalItem] = useState(0)
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [activeNotification, setActiveNotification] = useState<notificationProps | null>(null);
   
   console.log("The tab: ",activeTab)

  useEffect(()=> {
    const paginated = getPaginatedData(pageNumber, pageSize, notificationMockData);
     setPaginatedData(paginated.notifications)
     setPageNumber(paginated.pageNumber)
     setHasNextPage(paginated.hasNextPage)
     setTotalItem(paginated.totalItems)
    //  setActiveTab("");
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

    const handleTabClick = (notification: notificationProps) => {
      setActiveTab(notification.type);
      setActiveNotification(notification);
    };

    console.log("The selected role: ",)

    const getInitials = (name: string): string => {
      if (!name) return ""; 
      const trimmedName = name.trim();
      const nameParts = trimmedName.split(" ").filter((part) => part.length > 0);
      const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
      const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() : "";
      return `${firstNameInitial}${lastNameInitial}`;
    };

    const handleDeleteOpen = () =>{
        setIsDeleteOpen(true)
    }

    const handleDeleteNotification = () => {

    }
  
   
  return (
    <div className={`w-full h-full ${inter.className}`}>
      <div className='w-full h-full  md:flex'>
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
        <div className='flex justify-between items-center md:pr-7 mb-3 mt-3 md:px-3'>
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
         <div className='md:max-h-[30rem] max-h-[26rem]  overflow-y-auto'>
          <Tabs
          orientation="vertical"
          value={activeTab}
          onValueChange={setActiveTab}
          
          >
          <TabsList className="flex-col items-start  p-0 rounded-none h-full  w-full bg-white">
          {
            getPaginatedDatas.map((notification, index)=> (
              <div key={index} className='flex items-center w-full'>
        
                <div className='flex-1 border-t '>
                  <TabsTrigger 
                  value={notification.type} className={`w-full py-3  data-[state=active]:bg-[#F9F9F9] flex justify-between px-0 rounded-none`}
                  onClick={() => handleTabClick(notification)}
                  >
                  <div className='flex md:px-3 cursor-pointer' >
                  <div
                  className='mr-2' 
                  
                  >
                  <input 
               type="checkbox"
               id='uniqueCheck'
               className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md  opacity-60 bg-white`}
               onChange={() => handleCheckedRow(notification.id)}
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
          {
            activeTab !== "" && getPaginatedDatas.length > 0 ? (
                <div>
                   <p className="font-medium">
                    {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.type} */}
                    {activeNotification?.type}
                    </p>
                   <div className='text-[14px]'>
                   <div className="flex items-center">
                    <div className='flex gap-3 mt-5 mb-6'>
                      <div className="w-8 h-8 bg-[#E7F5EC] text-[16px] text-[#085322] rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {/* {getInitials(getPaginatedDatas.find((item) => item.type === activeTab)?.senderName || "")} */}
                          {getInitials(activeNotification?.senderName || "")}
                        </span>
                      </div>
                       <div>
                         <p className='text-[14px]'>
                          {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.senderEmail} */}
                          {activeNotification?.senderEmail}
                          </p>
                         <p className='text-[14px] text-[#475467]'>
                          {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.timeSent} */}
                          {activeNotification?.timeSent}
                          </p>
                       </div>
                      </div>
                    </div>
                    <div className='mb-4'>
                      Hello <span>
                        {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.receiverName} */}
                        {activeNotification?.receiverName}
                        </span>,
                    </div>
                   <div>
                   <p className="md:max-w-[36.2rem]">
                    {/* {getPaginatedDatas.find((item) => item.type === activeTab)?.message} */}
                    {activeNotification?.message}
                    </p>
                   </div>
                   <div className='mt-4 mb-4 md:max-w-[36.2rem]'>
                    {activeNotification?.callToActionRequired === true? (<p className='mb-4'>Click on the button to view the full details of your loan</p>): ""}
                    <p>If you have any question or further assistance, our customer service team is here to help you</p>
                   </div>
                    <div>
                     {activeNotification?.callToActionRequired === true?
                     <Button 
                      // className='bg-[#142854] hover:bg-[#142854] h-[45px] text-[14px]'
                       className='bg-[#F9F9F9] hover:bg-[#F9F9F9] text-white h-[45px] text-[14px] cursor-none shadow-none'
                      >
                        View loan offer
                        
                      </Button>
                      : ""}
                    </div>
                   </div>
                </div>
            ) : 
            (
              <div className='relative top-24 bottom-24'>
                <EmptyState
                name='Detail'
                icon={FileText}
                condition={true}
                notification={true}
                message='Click a notification to view its details'
                />
              </div>
            )
          }
         
        </div>
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

export default Notification
