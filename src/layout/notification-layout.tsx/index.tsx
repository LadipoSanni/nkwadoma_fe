"use client"
import React,{ReactNode,useEffect, useState } from 'react'
import SearchInput from '@/reuseable/Input/SearchInput'
import {inter} from "@/app/fonts"
import { Trash2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { notificationMockData } from '@/utils/Notification_mock-data';
// import { getPaginatedData } from '@/utils/Mock-paginated-data';
import NotificationButton from '@/reuseable/buttons/Notification-button';
import EmptyState from '@/reuseable/emptyStates/TableEmptyState';
import  DeleteNotification  from '@/reuseable/details/DeleteCohort';
import DeleteModal from '@/reuseable/modals/Delete-modal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { BellIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import SkeletonForViewNotification from '@/reuseable/Skeleton-loading-state/Skeleton-for-view-notification';
import { useViewAllNotificationQuery,useDeleteNotificationMutation,useSearchNotificationQuery } from '@/service/notification/notification_query';
import {useAppSelector} from "@/redux/store";
import {useToast} from "@/hooks/use-toast"
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'

interface Props{
    children: ReactNode
}

interface notificationProp {
  id: string,
  title: string,
  contentDetail: string,
  read: boolean
}

interface ApiError {
  status: number;
  data: {
      message: string;
  };
}


function NotificationLayout({children}: Props) {
       const totalNotification = useAppSelector(state => (state?.notification?.totalNotifications))
       const [searchTerm, setSearchTerm] = useState('');
       const [selectAll, setSelectAll] = useState(false);
       const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
       const [pageNumber,setPageNumber] = useState(0)
       const pageSize = 10
      //  const [getPaginatedDatas, setPaginatedData] = useState<notificationProps[]>([])
       const [hasNextPage,setHasNextPage] = useState(false)
      //  const [totalPage,setTotalPage] = useState(0)
       const [notificationDatas,setNotificationData]= useState<notificationProp[]>([])
      //  const [totalItem, setTotalItem] = useState(0)
       const [isDeleteOpen, setIsDeleteOpen] = useState(false);
       const [isMobile, setIsMobile] = useState(false);
       const [activeNotificationId, setActiveNotificationId] = useState<string | null>(null);
       const router = useRouter();
       const {toast} = useToast()
       const param = {
        title : searchTerm,
        pageSize: 10,
        pageNumber: pageNumber
    }

       const [deleteNotification,{isLoading:isloading}] = useDeleteNotificationMutation()
      
       const {data,isLoading} = useViewAllNotificationQuery({pageSize: pageSize,pageNumber: pageNumber})
       const {data: searchData} = useSearchNotificationQuery({param},{skip: !searchTerm})

       useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)'); 
        setIsMobile(mediaQuery.matches);

        const handleResize = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

       useEffect(()=> {
        if (searchTerm && searchData && searchData?.data) {
          const result = searchData?.data?.body
          setNotificationData(result)
          setHasNextPage(searchData?.data?.hasNextPage)
          setPageNumber(searchData?.data?.pageNumber)
        } 
        else  if(!searchTerm && data && data?.data){
             setNotificationData(data?.data?.body)
             setHasNextPage(data?.data?.hasNextPage)
             setPageNumber(data?.data?.pageNumber)
             
          }
          //  const paginated = getPaginatedData(pageNumber, pageSize, notificationMockData);
          //   setPaginatedData(paginated.notifications)
          //   setPageNumber(paginated.pageNumber)
          //   setHasNextPage(paginated.hasNextPage)
          //   setTotalItem(paginated.totalItems)
            // console.log("The paginated data: ",paginated)
         },[searchTerm, searchData,data])

       
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
                notificationDatas?.forEach((data) => allRowIndexes.add(String(data.id)));
                setSelectedRows(allRowIndexes);
              }
              setSelectAll(!selectAll);
           }

           

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
           
               const trackCountFirst = pageNumber  * pageSize + 1;
               const trackCountLast = Math.min((pageNumber + 1) * pageSize, totalNotification);

               const handleDeleteOpen = () =>{
                setIsDeleteOpen(true)
            }
        
            const handleDeleteNotification = async (ids: string[]) => {
                try{
                  const deleteNotifications = await deleteNotification(ids).unwrap()
                  if(deleteNotifications){
                    setTimeout(() => {
                      toast({
                        description: deleteNotifications?.data?.message || `${selectedRows.size === 1? "Notification deleted successfully" : "Notifications deleted successfully"} `,
                        status: "success",
                    })
                    })
                    router.push("/notifications/notification")
                  }

                }catch(error){
                  const err = error as ApiError;
                  toast({
                    description: err?.data?.message || "Error deleting notification",
                    status: "error",
                })
                }
            }

            const handleTabClick = (id: string) => {
                router.push(`/notifications/notification/${id}`);
              };

            const handleMobileClick = (id: string) => {
                router.push(`/notifications/details/${id}`);
            }

            const handleClick = (id: string) => {
              setActiveNotificationId(id);
                if (isMobile) {
                    handleMobileClick(id);
                } else {
                    handleTabClick(id);
                }
            };
            
            
  return (
    <div className={`w-full h-full md:flex ${inter.className}`}>
     <div className='md:border-r  lg:min-w-[28.125rem]'>
    { isLoading ? <div><SkeletonForViewNotification/></div> :
          <div className='h-full'>
        <div className='md:px-3 px-3 pt-4 md:pt-4 md:pr-7'>
        <SearchInput
              id={'ProgramSearchInput'}
               value={searchTerm}
               onChange={handleSearchChange}
               style='md:w-full py-1'
               testId='ProgramSearch'
          />
        </div>
         <div>
           {
            searchTerm && notificationDatas.length === 0? <div className='relative bottom-8 top-8'>
              <SearchEmptyState icon={MdSearch} name='Notification'/>
            </div> :
        notificationDatas.length === 0? (
        <div className='relative bottom-8 top-8 '>
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
        <div className='flex justify-between items-center md:pr-7 mb-3 mt-7 md:px-3  px-4'>
        <div className="flex items-center">
            <input
             data-testid="AllNotifications" 
               type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              id={`selectAll`}
              className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md mr-2`}
            />
            <span className='font-medium' >All Notifications</span>
          </div>
          <div>
            <button 
            disabled={selectedRows.size === 0} 
            className={selectedRows.size === 0? "cursor-none " : "cursor-pointer "}
            onClick={handleDeleteOpen}
            data-testid="DeleteNotification"
            >
              <Trash2 
              color={selectedRows.size > 0 ? '#D42620' : '#B6BCCA'}
              className={`w-full  h-[14px] `}
              
              />
            </button>
          </div>
        </div>
         <div className='md:max-h-[56vh] max-h-[58vh]  overflow-y-auto'
         style={{
          overflowX: "hidden",  
          overflowY: "auto",    
        }}
        
         >
          <Tabs
          orientation="vertical" 
          >
          <TabsList 
          className="flex-col items-start  p-0 rounded-none h-full  w-full bg-white"

          >
          {
            notificationDatas.map((notification, index)=> (
              <div key={index} className={`flex items-center w-full border-t md:border-none  ${
    activeNotificationId === notification.id ? "bg-[#F9F9F9] data-[state=active]:bg-[#F9F9F9]" : ""
} ${
    selectedRows.has(notification.id) ? "bg-[#F9F9F9] data-[state=active]:bg-[#F9F9F9]"  : ""
}  `}>
              <div key={index} className='flex items-center w-full px-4 md:px-0'>
        
                <div className='flex-1 md:border-t  '>
                  <TabsTrigger 
                  value={notification.title} className={`w-full py-3   flex justify-between px-0 rounded-none   ${
    activeNotificationId === notification.id ? "bg-[#F9F9F9] data-[state=active]:bg-[#F9F9F9]" : ""
} ${
    selectedRows.has(notification.id) ? "bg-[#F9F9F9] data-[state=active]:bg-[#F9F9F9]"  : ""
}`}
                onClick={() =>handleClick(notification.id)}
                  >
                  <div className='flex md:px-3 cursor-pointer' >
                  <div
                  className='mr-2' 
                  
                  >
                  <input 
                  data-testid="UniqueCheck" 
               type="checkbox"
               id='uniqueCheck'
               className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md  bg-white`}
               onChange={() => {
                handleCheckedRow(notification.id)
            }}
               checked={selectedRows.has(notification.id)}
               onClick={(e) => e.stopPropagation()}
                />
                </div>
                <div className='flex-col flex items-start'>
                  <div className="text-[14px] font-medium text-[#212221]">{notification.title}</div>
                <div className='font-normal max-w-64 whitespace-nowrap overflow-hidden text-ellipsis'>{notification.contentDetail}</div>
                </div>
                  
                  </div>
                  <div className='mr-3'>
                    {
                      notification.read === false?
                   <div data-testid="read" className='text-5xl text-[#06792D]'>.</div>
                   : ""
                    }
                  </div>
                  
                </TabsTrigger>
                </div>
              
              </div>
              </div>
            ))
          }
          </TabsList>
          </Tabs>
          </div>   
          <div className='border-t flex justify-end'>
          <NotificationButton
            totalItem={totalNotification}
            handleLeftChange={handleLeftChange}
            handleRightChange={handleRightChange}
            trackCountFirst={trackCountFirst}
            trackCountLast={trackCountLast}
            pageNumber={pageNumber}
            hasNextPage={hasNextPage}
            style='mt-4 px-4'
            testIdNext='handleNext'
            testIdPrevious='handlePrevious'
          />
            </div> 
            </div>
            ) }
            </div>
            </div>
            
    }
              
            </div>
            <div className='px-5 w-full flex-grow hidden md:block'>
                {children}
            </div>
            <div>
          <DeleteModal
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
              handleMultipleDelete={handleDeleteNotification}
              isLoading={isloading}
              ids={Array.from(selectedRows)}
           />
          </DeleteModal>
        </div> 
    </div>
  )
}

export default NotificationLayout