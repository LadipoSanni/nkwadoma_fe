import React from 'react';
import { Menubar, MenubarTrigger, MenubarContent, MenubarMenu, MenubarItem } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { FiMoreVertical } from "react-icons/fi";
import { inter } from "@/app/fonts";

interface Props {
    handleDropDownClick?: (id: string) => void;
    kebabOptions?: { id: string, name: string }[];
    className?: string;
}

const Kebab = ({ handleDropDownClick, kebabOptions, className }: Props) => {
    return (
        <div className="relative">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger asChild className="border-none shadow-none cursor-pointer focus:ring-0 focus-visible:ring-0">
                        <Button className="border-none shadow-none">
                            <FiMoreVertical className="w-5 h-6 text-grey500 font-extrabold" />
                        </Button>
                    </MenubarTrigger>
                    <MenubarContent
                        className={`${inter.className} bg-white gap-3 shadow-grey100 rounded-md min-w-[10rem] right-[-40px] absolute w-full md:min-w-[10rem]`}
                    >
                        {
                            kebabOptions?.map((option, index) => (
                                <MenubarItem
                                    key={index}
                                    className={`cursor-pointer pr-8 mt-2 ${className} ${option.id === '3' && 'text-error500 focus:text-error500'} `}
                                    onClick={() => handleDropDownClick && handleDropDownClick(option.id)}
                                >
                                    {option.name}
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

export default Kebab;


// import React from 'react';
// import { Menubar,MenubarTrigger,MenubarContent,MenubarMenu,MenubarItem} from '@/components/ui/menubar'
// import { Button } from '@/components/ui/button'
// import {FiMoreVertical} from "react-icons/fi";
// import {inter} from "@/app/fonts";
//
//
// interface Props {
//     handleDropDownClick?: (id: string) => void;
//     kebabOptions?: {id: string, name: string}[];
//     className?: string;
//
// }
//
// const Kebab = ({handleDropDownClick, kebabOptions,className}: Props) => {
//     return (
//         <div>
//           <Menubar>
//               <MenubarMenu>
//                   <MenubarTrigger asChild className={`border-none shadow-none cursor-pointer focus:ring-0 focus-visible:ring-0`}>
//                       <Button className={`border-none shadow-none text-gray-50`}>
//                           <FiMoreVertical className="w-5 h-6 text-grey500 font-extrabold" />
//                       </Button>
//                   </MenubarTrigger>
//                   <MenubarContent
//                       className={`${inter.className} bg-white gap-3 shadow-grey100 rounded-md mr-11 relative bottom-6 min-w-[8rem] mt-4 left-[-120px]`}
//                   >
//                       {
//                           kebabOptions?.map((option, index) => (
//                               <MenubarItem
//                                   key={index}
//                                   className={`cursor-pointer pr-8 mt-2 ${className} ${option.id === '3' && 'text-error500 focus:text-error500'} `}
//                                   onClick={()=> handleDropDownClick && handleDropDownClick(option.id)}
//                               >
//                                   {option.name}
//                               </MenubarItem>
//                           ))
//                       }
//                   </MenubarContent>
//               </MenubarMenu>
//           </Menubar>
//         </div>
//     )
// }
// export default Kebab;