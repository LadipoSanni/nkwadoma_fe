import React,{ useState, useRef, useEffect } from 'react'
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {inter, inter500} from "@/app/fonts";
import { MdOutlineDateRange, MdOutlinePeopleAlt, MdPersonOutline} from "react-icons/md";
import { Button } from '../ui/button';
import { Menubar, MenubarTrigger,MenubarContent,MenubarMenu,MenubarItem} from "@/components/ui/menubar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import SkeletonForGrid from '@/reuseable/Skeleton-loading-state/Skeleton-for-grid';
import InfiniteScroll from "react-infinite-scroll-component";
import TableEmptyState from '@/reuseable/emptyStates/TableEmptyState';
import {Book} from 'lucide-react';
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import { toSentenceCase } from '@/utils/GlobalMethods';

export interface ViewAllProgramProps {
    id?: string;
    programDescription?: string;
    name?: string;
    durationType?: string;
    programStartDate?: string;
    duration?: number;
    mode?: string;
    deliveryType?: string;
    totalAmountRepaid?: number;
    totalAmountDisbursed?: number;
    totalAmountOutstanding?: number
    numberOfLoanees?: number;
    numberOfCohort: number 
}

interface DropdownOption {
    name: string;
    id: string;
  }

interface InfiniteScrollProps {
    loadMore: () => void;
    hasMore: boolean;
    loader?: React.ReactNode;
}


interface Props {
    viewAllProgram: ViewAllProgramProps[];
    handleRowClick: (program: ViewAllProgramProps) => void;
    kirkBabDropdownOption?: DropdownOption[];
    handleDropDownClick?: (id: string, row: ViewAllProgramProps) => void;
    infinityScroll: InfiniteScrollProps;
    isLoading?: boolean;
    searchTerm?: string;
    isSearchFetching?: boolean
}

function ProgramGrid({viewAllProgram,handleRowClick,kirkBabDropdownOption,handleDropDownClick,infinityScroll,isLoading,searchTerm,isSearchFetching}:Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollHeight, setScrollHeight] = useState(500);
    const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);

    useEffect(() => {
        if (prevSearchTerm !== searchTerm) {
            if (!isSearchFetching) {
                setPrevSearchTerm(searchTerm);
            }
        }
    }, [searchTerm, isSearchFetching, prevSearchTerm]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }
    
        const updateHeight = () => {
            if (!containerRef.current || !window) return;
            
            try {
                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const distanceFromTop = rect.top;
                const availableHeight = viewportHeight - distanceFromTop - 32;
                
                setScrollHeight(Math.max(availableHeight, 300));
            } catch (error) {
                console.warn('Error calculating scroll height:', error);
                setScrollHeight(400); 
            }
        };
    
        updateHeight();
        
        
        if (window) {
            window.addEventListener('resize', updateHeight);
        }
        
        let observer: MutationObserver | null = null;
        if (containerRef.current && typeof MutationObserver !== 'undefined') {
            observer = new MutationObserver(updateHeight);
            observer.observe(containerRef.current, { 
                childList: true, 
                subtree: true,
                attributes: true 
            });
        }
    
        return () => {
            if (window) {
                window.removeEventListener('resize', updateHeight);
            }
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);
    
  return (
    <div >
   { isLoading || (isSearchFetching && prevSearchTerm !== searchTerm) ? <SkeletonForGrid /> : searchTerm &&  viewAllProgram.length === 0 ? (
    <TableEmptyState
    name={"program"}
     icon={<MagnifyingGlassIcon/>}
    condition={true}
    isSearch={true}
    />) : viewAllProgram.length === 0 ? (
    <TableEmptyState
    name={"program"}
    icon={<Book width={"2.5rem"} height={"2.5rem"}/>}
    condition={true}
    />) :
    <InfiniteScroll
      dataLength={viewAllProgram.length}
      next={infinityScroll.loadMore}
      hasMore={infinityScroll.hasMore}
      loader={infinityScroll.loader ? <div className='flex items-center justify-center mt-3'>Loading more...</div> : null}
      height={scrollHeight} 
      className="w-full"
    >
     <div className="grid grid-cols-1 pr-2 md:grid-cols-2 w-full  sm:grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-4 "> 
    {
     viewAllProgram.map((program, index) => {

const tagButtonData = [
        {
            tagIcon: MdPersonOutline,
            tagCount: Number(program.numberOfLoanees ?? 0),
            tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
            tagText: Number(program.numberOfLoanees ?? 0) <= 1 ? "loanee" : "loanees",
        },
        {
            tagIcon: MdOutlineDateRange,
            tagCount: Number(program.duration ?? 0),
            tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
            tagText: Number(program.duration ?? 0) <= 1 ? "month" : "months",
        },
        {
            tagIcon: MdOutlinePeopleAlt,
            tagCount: Number(program.numberOfCohort ?? 0),
            tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
            tagText: Number(program.numberOfCohort ?? 0) <= 1 ? "cohort" : "cohorts",
        },
    ];

    const stripHtmlTags = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html.replace(/<\/p><p>/g, ' ');
        return div.textContent || div.innerText || '';
    };

    const description =  program.programDescription

    const plainTextDescription = stripHtmlTags(description || "Description not provided");

    const shortDescription = plainTextDescription.length > 90
        ? plainTextDescription.substring(0, 80)
        : plainTextDescription;

    const shortTitle = program.name && program.name.length > 15 ? `${program.name.substring(0, 20)}...` : program.name;

        return (
            <div key={`wrapper-${program.id}-${index}`} >      
            <Card  id={`allProgramsCard-${index}`} data-testid="allProgramsCard"  className="w-full md:max-w-lg h-[13.8125rem]  border border-grey50 rounded-lg cursor-pointer pt-0" onClick={() => handleRowClick(program)}>
            <CardHeader id={`header-${index}`} data-testid="header" className="flex flex-row justify-between items-center" >
                 <CardTitle id={`title`} data-testid="title" className={`${inter500.className} text-lg font-medium text-[#101828]`} >
                 {toSentenceCase(shortTitle)}
            {program.name && program.name.length > 90 && (
             <span
                id={`readMore-${index}`}
                data-testid="readMore"
                className={`${inter500.className} text-grey450 ml-2`}
            >
                { "...."}
            </span>)}
            </CardTitle>
            <div onClick={(e) => e.stopPropagation()} className='relative left-4'>
               <Menubar>
            <MenubarMenu>
                <MenubarTrigger
                asChild
                className={`border-none shadow-none cursor-pointer hover:bg-b`}
                >
                <Button className="border-none shadow-none" id="kirkBabButton">
                    <DotsVerticalIcon className="w-5 h-6 text-grey500 font-extrabold" />
                </Button>
                </MenubarTrigger>
                <MenubarContent className="bg-white shadow-md rounded-md mr-11 relative bottom-6 min-w-[8rem] mt-3">
                {kirkBabDropdownOption?.map(
                    (option, index) => (
                    <MenubarItem
                        id={`${index}optionItem`}
                        key={index}
                        className={`cursor-pointer mt-2 pr-8  ${
                        option.id === "3"
                            ? "text-error500 focus:text-error500"
                            : ""
                        }`}
                        onClick={() =>
                        handleDropDownClick &&
                        handleDropDownClick(option.id, program)
                        }
                    >
                        {option.name}
                    </MenubarItem>
                    )
                )}
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
            </div>
            </CardHeader>

            <CardContent id={`contentId`} data-testid={`contentId`}>
            <CardDescription id={`description-${index}`} data-testid="description"
            className={`${inter.className}  text-sm text-[#4D4E4D] md:text-[#4D4E4D] line-clamp-2 h-10`}>
              <span
                            dangerouslySetInnerHTML={{ __html: shortDescription}}
                        />

                    {plainTextDescription.length > 90 && (
                        <span
                            id={`readMore-${index}`}
                            data-testid="readMore"
                            className="${inter.className} text-[#4D4E4D] md:text-[#4D4E4D] ml-2"
                        >
              { "...."}
            </span>
              )}
            </CardDescription>

            <div
            id={`details-${index}`}
            data-testid="details"
            className="grid grid-cols-2 gap-3 w-fit mt-4 cursor-pointer"
        >
            {tagButtonData.map((tagProps, index) => (
                <TagButton key={index} {...tagProps} />
            ))}

        </div>

            </CardContent>
            </Card>

            </div>
        )
     })
    }
    </div>
     </InfiniteScroll>  
     }
    </div>
  )
}

export default ProgramGrid
