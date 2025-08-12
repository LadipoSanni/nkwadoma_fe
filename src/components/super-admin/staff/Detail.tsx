import React from 'react'
import { inter,cabinetGrotesk } from '@/app/fonts';
import { FiMoreVertical } from 'react-icons/fi';
import { DropdownMenu,DropdownMenuContent,  DropdownMenuTrigger,DropdownMenuGroup,DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { formatMonthInDate } from '@/utils/Format'
import ActivateOrganization from "@/components/portfolio-manager/organization/ActivateOrganization";
import DeactivateOrganization from "@/components/portfolio-manager/organization/DeactivateOrganization";

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

    
    const dropDownOption = [
      status === "Deactivated"?  {name: 'Activate', id: '1'} : {name: 'Deactivate', id: '2'}
    ];

    const handleDropdownClick = () => {
        setSwitch(true)
    }
  return (
    <div className=''>
     {  !isSwitch? 
        <div>
        <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3 relative right-4 md:right-0'>
     
        <p
        className={` rounded-full h-12 w-12 flex items-center justify-center text-[20px] bg-[#FEF6F0] text-[#68442E] text-sm font-semibold uppercase ${cabinetGrotesk.className}`}
      >
       {
        name
            ?.split(" ")
            .filter((word: string) => word.trim() !== "") 
            .filter((_: string, i: number, arr: string[]) => i === 0 || i === arr.length - 1)
            .map((word: string) => word[0].toUpperCase())
            .join("")
        }
      </p>
      <div className={`text-[#212221] ${inter.className}`}>
        <p className='font-medium text-[16px]'>{name}</p>
         <p className='text-[14px]'>{role}</p>
      </div>
        </div>

        <div>
       {status !== "Invited" && <DropdownMenu>
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
                <p className={`${status === "Active"? "bg-[#E6F2EA] text-[#045620] w-14 " :status === "Pending"? "bg-[#FEF6E8] text-[#68442E] w-16" :  "bg-[#FBE9E9] text-[#971B17] w-24"} flex items-center justify-center rounded-lg mt-2`}>{status}</p>
            </div>

            <div className='' > 
                <p className='text-[#6A6B6A]'>Email address</p>
                <p className={``}>{email}</p>
            </div>

            <div className='' > 
                <p className='text-[#6A6B6A]'>Date invited</p>
                <p className={``}>{formatMonthInDate(dateInvited)}</p>
            </div>
        </div>
        <div className='w-80'> </div>
    </div> : <div>
        {
            status === "Active"? 
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
    </div>
  )
}

export default Detail
