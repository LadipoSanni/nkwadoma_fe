// import React from 'react';
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectGroup} from "@/components/ui/select";
// import {Label} from "@/components/ui/label";
// import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { InfiniteScrollProps } from '@/types/Component.type';
// import SkeletonForLoanOrg from '../Skeleton-loading-state/Skeleton-for-loan-organizations';
// import GeneralEmptyState from '../emptyStates/General-emptystate';
// import {Book} from 'lucide-react';

// interface viewAllProgramProps {
//     id?: string;
//     name: string;

// }




// interface ProgramSelectProps {
//     selectedProgram: string | null;
//     setSelectedProgram: (program: string) => void;
//     isSelectOpen: boolean;
//     setIsSelectOpen: (open: boolean) => void;
//     selectOptions: viewAllProgramProps[];
//     setId: (id: string) => void;
//     label: string;
//     placeholder: string;
//     infinityScroll?: InfiniteScrollProps;
//     isLoading?: boolean
//     onOpenChange?: (open: boolean) => void;
// }

// const ProgramSelect: React.FC<ProgramSelectProps> = ({
//                                                          selectedProgram,
//                                                          setSelectedProgram,
//                                                          isSelectOpen,
//                                                          setIsSelectOpen,
//                                                          selectOptions,
//                                                          setId,
//                                                          placeholder,
//                                                          label,
//                                                          infinityScroll,
//                                                          isLoading,
//                                                          onOpenChange
//                                                      }) => {
//     const uniqueId = `select${Math.random().toString(36).substring(2, 9)}`;


//     return (
//         <div id="programContainer" className={'grid gap-2 w-full'}>
//             <Label htmlFor={uniqueId}
//                    className="block text-[14px] font-medium leading-[22px] text-labelBlue">{label}</Label>
//             <Select
//                 onValueChange={(value) => {
//                     const selectedProgram = selectOptions.find((program) => program.name === value);
//                     if (selectedProgram) {
//                         setId(selectedProgram.id ?? "");
//                     }
//                     setSelectedProgram(value)
//                 }}
//                 onOpenChange={(open) => {setIsSelectOpen(open);onOpenChange?.(open)}}>
//                 <SelectTrigger id="programSelectTrigger"
//                                className={`${selectedProgram ? 'text-black500' : 'text-black300'} shadow-none mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650 `}>
//                     <SelectValue placeholder={placeholder}>{selectedProgram }</SelectValue>
//                     {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
//                         <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
//                 </SelectTrigger>
//                 <SelectContent id="programSelectContent"  style={{ zIndex: 1000, }} >
//                     {isLoading? (<div><SkeletonForLoanOrg/></div>) : selectOptions.length === 0? (<div>
//                         <GeneralEmptyState
//                           icon={Book}
//                           iconSize='1.6rem'
//                           iconContainerClass='w-[30px] h-[30px]'
//                           message={<div className='relative bottom-2'>
//                             <p>No program available</p>
//                           </div>}
//                         />
//                     </div>) : (
//                       <div 
//                       className={` w-full overflow-x-auto ${infinityScroll? "overflow-y-auto" : "max-h-[26.5vh]"}`} 
//                       style={{
//                        scrollbarWidth: "none",
//                        msOverflowStyle: "none",
//                      }}
//                      >
//                         {  infinityScroll? (
//                             <div>
//                           <InfiniteScroll
//                             dataLength={selectOptions.length}
//                             next={infinityScroll.loadMore}
//                             hasMore={infinityScroll.hasMore}
//                             loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
//                             className="min-w-full w-max"
//                             height="30.5vh"                      
//                               >
//                                 <SelectGroup
//                                 className='min-w-full w-max'
//                                 >
//                               {
//                                 selectOptions.map((item) => {
//                                     return (
//                                         <SelectItem
//                                         id={item.id}
//                                        key={item.id}
//                                        value={item.name}
//                                         className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950"
//                                         >
//                                       {item?.name}
//                                         </SelectItem>
//                                     )
//                                 })
//                               }
//                                 </SelectGroup>
//                               </InfiniteScroll>
//                           </div>
//                         ) : (
//                             <SelectGroup className='min-w-full w-max'>
//                                 {
//                              selectOptions.map((program) => (
//                         <SelectItem id={`program${program.name.replace(/\s+/g, '')}`}
//                                     className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950"
//                                     key={program.id} value={program.name}>
//                             {program?.name}
//                         </SelectItem>
//                     )) 
//                         }
//                         </SelectGroup>)
//                         }
                        
//                       </div>
//                    )}
//                 </SelectContent>
//             </Select>
//         </div>
//     )
// }

// export default ProgramSelect;
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteScrollProps } from '@/types/Component.type';
import SkeletonForLoanOrg from '../Skeleton-loading-state/Skeleton-for-loan-organizations';
import GeneralEmptyState from '../emptyStates/General-emptystate';
import { Book } from 'lucide-react';

interface viewAllProgramProps {
  id?: string;
  name: string;
}

interface ProgramSelectProps {
  selectedProgram: string | null;
  setSelectedProgram: (program: string) => void;
  isSelectOpen: boolean;
  setIsSelectOpen: (open: boolean) => void;
  selectOptions: viewAllProgramProps[];
  setId: (id: string) => void;
  label: string;
  placeholder: string;
  infinityScroll?: InfiniteScrollProps;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ProgramSelect: React.FC<ProgramSelectProps> = ({
  selectedProgram,
  setSelectedProgram,
  isSelectOpen,
  setIsSelectOpen,
  selectOptions,
  setId,
  placeholder,
  label,
  infinityScroll,
  isLoading,
  onOpenChange
}) => {
  const uniqueId = `select${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div id="programContainer" className={'grid gap-2 w-full'}>
      <Label htmlFor={uniqueId}
             className="block text-[14px] font-medium leading-[22px] text-labelBlue">{label}</Label>
      <Select
        defaultValue={selectedProgram || undefined}
        value={selectedProgram || undefined}
        onValueChange={(value) => {
          const selectedProgram = selectOptions.find((program) => program.name === value);
          if (selectedProgram) {
            setId(selectedProgram.id ?? "");
          }
          setSelectedProgram(value);
        }}
        onOpenChange={(open) => {
          setIsSelectOpen(open);
          onOpenChange?.(open);
        }}
      >
        <SelectTrigger id="programSelectTrigger"
                       className={`${selectedProgram ? 'text-black500' : 'text-black300'} shadow-none mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650`}>
          <SelectValue placeholder={placeholder}>{selectedProgram}</SelectValue>
          {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
            <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
        </SelectTrigger>
        <SelectContent 
          id="programSelectContent" 
          className="relative"
          style={{ zIndex: 1000 }}
        >
          {isLoading ? (
            <div><SkeletonForLoanOrg/></div>
          ) : selectOptions.length === 0 ? (
            <div>
              <GeneralEmptyState
                icon={Book}
                iconSize='1.6rem'
                iconContainerClass='w-[30px] h-[30px]'
                message={<div className='relative bottom-2'>
                  <p>No program available</p>
                </div>}
              />
            </div>
          ) : (
            <div 
              className={`w-full ${infinityScroll ? "" : "max-h-[26.5vh] overflow-y-auto"}`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                touchAction: "pan-y"
              }}
            >
              {infinityScroll ? (
                <InfiniteScroll
                  dataLength={selectOptions.length}
                  next={infinityScroll.loadMore}
                  hasMore={infinityScroll.hasMore}
                  loader={infinityScroll.loader ? <SkeletonForLoanOrg /> : null}
                  height="30.5vh"
                  className="w-full"
                >
                  <SelectGroup className="w-full">
                    {selectOptions.map((item) => (
                      <SelectItem
                        id={item.id}
                        key={item.id}
                        value={item.name}
                        className="  text-lightBlue950 hover:bg-[#EEF5FF] focus:bg-[#EEF5FF]"
                      >
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </InfiniteScroll>
              ) : (
                <SelectGroup className="w-full">
                  {selectOptions.map((program) => (
                    <SelectItem 
                      id={`program${program.name.replace(/\s+/g, '')}`}
                      className="focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950"
                      key={program.id} 
                      value={program.name}
                    >
                      {program?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProgramSelect;