import React,{useEffect} from 'react'
import { inter,cabinetGrotesk } from '@/app/fonts';
import { FiMoreVertical } from 'react-icons/fi';
import { DropdownMenu,DropdownMenuContent,  DropdownMenuTrigger,DropdownMenuGroup,DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { formatMonthInDate } from '@/utils/Format'
import ActivateOrganization from "@/components/portfolio-manager/organization/ActivateOrganization";
import DeactivateOrganization from "@/components/portfolio-manager/organization/DeactivateOrganization";
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import { useAppSelector } from '@/redux/store';
import { useViewStaffDetailsQuery } from '@/service/admin/organization';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForModal from '@/reuseable/Skeleton-loading-state/Skeleton-for-modal';

interface Props {
    role : string;
    status : string;
    email : string;
     id : string;
    name: string;
    dateInvited: string;
    isSwitch?: boolean;
    setSwitch: (is: boolean)=> void
    setIsOpen: (isOpen: boolean) => void
}

function Detail({role,status,email,name,dateInvited,isSwitch,setSwitch,setIsOpen,id}:Props) {
     const user_role = getUserDetailsFromStorage('user_role');
     const userId =  useAppSelector(state => state?.request?.requestedStaffId)
      const {data,isLoading: detailLoading,refetch} = useViewStaffDetailsQuery({employeeId: userId },{skip: !userId})


           const userInvited = data? capitalizeFirstLetters(data?.data?.firstName) + " " +  capitalizeFirstLetters( data?.data?.lastName) : name
           const roles =  data?.data?.role === "PORTFOLIO_MANAGER"? "Portfolio manager" :  ["MEEDL_ADMIN","ORGANIZATION_ADMIN"].includes(data?.data?.role)? "Admin" : [ "MEEDL_ASSOCIATE","ORGANIZATION_ASSOCIATE"].includes(data?.data?.role)? "Associate" : data?.data?.role === "COOPERATE_FINANCIER_ADMIN"? "Admin"  : ""
           const userRole = roles? roles : role
           const userStatus =  data?.data?.activationStatus === "INVITED"? "Invited" : data?.data?.activationStatus === "ACTIVE"? "Active" : data?.data?.activationStatus === "DEACTIVATED"? "Deactivated" : data?.data?.activationStatus === "PENDING_APPROVAL"? "Pending_approval" :data?.data?.activationStatus === "DECLINED"? "Declined" :  status
           const invitedDate = data? data?.data?.createdAt : dateInvited
           const staffEmail = data? data?.data?.email : email


    const dropDownOption = [
      status === "Deactivated"?  {name: 'Activate', id: '1'} : {name: 'Deactivate', id: '2'}
    ];

     useEffect(() => {
          if(userId){
            refetch()
          }
        },[refetch,userId])
    

    const handleDropdownClick = () => {
        setSwitch(true)
    }
  return (
    <div>
{  detailLoading  ? <SkeletonForModal/>  : 
 <div className=''>
     {  !isSwitch? 
        <div>
        <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3 relative right-4 md:right-0'>
     
        <p
        className={` rounded-full h-12 w-12 flex items-center justify-center text-[20px] bg-[#FEF6F0] text-[#68442E] text-sm font-semibold uppercase ${cabinetGrotesk.className}`}
      >
       {
        userInvited
            ?.split(" ")
            .filter((word: string) => word.trim() !== "") 
            .filter((_: string, i: number, arr: string[]) => i === 0 || i === arr.length - 1)
            .map((word: string) => word[0].toUpperCase())
            .join("")
        }
      </p>
      <div className={`text-[#212221] ${inter.className}`}>
        <p className='font-medium text-[16px]'>{userInvited}</p>
         <p className='text-[14px]'>{userRole}</p>
      </div>
        </div>

        <div>
       { !["Invited","Pending_approval","Declined"].includes(userStatus) && ["MEEDL_SUPER_ADMIN","ORGANIZATION_SUPER_ADMIN","COOPERATE_FINANCIER_SUPER_ADMIN","MEEDL_ADMIN"].includes(user_role || "") && <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                 id="kebabButton"
                 data-testid="kebab-button"
                 className="border-none shadow-none rounded-full bg-[#F6F6F6] w-9 h-9 flex items-center justify-center relative left-2 cursor-pointer"
                >
                    <FiMoreVertical
                    id="kebabsIcon"
                    data-testid="kebabs-icon"
                    className="w-5 h-6 text-[#939CB0]  font-extrabold " 
                    />
                </div>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              id="menubarContent"
                data-testid="menubar-content"
                className={`${inter.className} pr-1 pl-1  mt-0 h-10 bg-white shadow-sm gap-3 shadow-grey100 rounded-md  absolute right-[-1px] z-10 flex items-center`}
            >
                <DropdownMenuGroup>
                    {
                        dropDownOption?.map((option, index) => (
                            <DropdownMenuItem
                            key={index}
                            id={`menubarItem-${index}`}
                            data-testid={`menubar-item-${index}`}
                            className={`cursor-pointer w-32 h-8 flex px-2 items-center text-[14px] ${
                                option.id === "2" ? "text-error500 focus:text-error500 focus:bg-error50 hover:bg-error50 border-none" : "hover:bg-[#D9EAFF] focus:bg-[#D9EAFF]  border-none"
                            }`}
                            onClick={handleDropdownClick}
                            >
                            {option.name}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        }
        </div>
        </div>
        <div className='h-[1px] w-full bg-[#D7D7D7] mt-5'></div>
        <div className='text-[14px] grid grid-cols-1 gap-y-6 mt-6 mb-6'>
            <div className='' > 
                <p className='text-[#6A6B6A]'>Status</p>
                <p className={`${userStatus === "Active"? "bg-[#E6F2EA] text-[#045620] w-12 " :userStatus === "Deactivated"? "bg-[#FBE9E9] text-[#971B17] w-24" :userStatus === "Pending_approval"? "bg-[#E6F7EE] text-[#039855] w-16" :userStatus === "Declined"? "bg-[#FBE9E9] text-[#971B17]  w-16" :  "bg-[#FEF6E8] text-[#045620] w-16"} flex items-center justify-center rounded-lg mt-2`}>{userStatus === 'Pending_approval'? "Pending" : userStatus}</p>
            </div>

            <div className='' > 
                <p className='text-[#6A6B6A]'>Email address</p>
                <p className={``}>{staffEmail}</p>
            </div>

            <div className='' > 
                <p className='text-[#6A6B6A]'>Date invited</p>
                <p className={``}>{formatMonthInDate(invitedDate)}</p>
            </div>
        </div>
        <div className='w-80'> </div>
    </div> : <div>
        {
            userStatus === "Active"? 
            <div>
                <DeactivateOrganization
                 id={id}
                 setIsOpen={setIsOpen}
                 setSwitch={setSwitch}
                 deactivateUser='staff'
                />
            </div>  
            : 
            <div>
                <ActivateOrganization
                 id={id}
                 setIsOpen={setIsOpen}
                 setSwitch={setSwitch}
                 reactivateUser='staff'
                />
            </div>
        }
    </div>
    }
    </div>}
    </div>
  )
}

export default Detail
