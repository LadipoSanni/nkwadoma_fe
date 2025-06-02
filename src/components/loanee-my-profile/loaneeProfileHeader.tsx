import {cabinetGroteskBold, inter700, inter} from '@/app/fonts';
import React from 'react';
import {MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Circle } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface props {
    cohort: string,
    program: string,
}

const LoaneeProfileHeader = ({cohort , program}: props) => {

    const [clickDrop, setClickDrop] = React.useState(false);

    const toggleArrow = () => {
        console.log('toggle')
        setClickDrop(!clickDrop);
    }

    return (
        <div id={'loaneeProfileHeader'}
             data-testid={'loaneeProfileHeader'}
             className={`w-full h-fit md:h-[13vh] py-4 border-b border-b-grey-200 px-4  mt-auto mb-auto  md:flex grid gap-4  md:justify-between `}
        >
            <div
                id={'cohortAndProgramInfo'}
                data-testid={'cohortAndProgramInfo'}
                className={` w-fit h-full flex gap-2`}
            >
                <div
                    id={'cohortImage'}
                    data-testid={'cohortImage'}
                    className={`h-[4rem] w-[4rem] mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
                >

                </div>
                <div className={` mt-auto mb-auto `}>
                    <span id={'cohortName'} data-testid={'cohortName'} className={` ${cabinetGroteskBold.className} text-[20px] text-[#212221] `}>Semicolon Africa</span>
                    <div className={`  flex  gap-2 `}>
                        <p className={`${inter.className} text-[#4D4E4D] text-[14px] `}>{cohort}</p>
                        <Circle color={'#ECECEC'} className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary" />
                        <p className={`${inter.className} text-[#4D4E4D] text-[14px] `}>{program}</p>
                    </div>
                </div>
            </div>

            <DropdownMenu
            >
              <div
                  id={'deferAndDropOut'}
                  data-testid={'deferAndDropOut'}
                      className={` ${inter700.className} flex justify-center mt-auto mb-auto  py-3 text-[14px] gap-2 bg-meedlBlue w-full  md:w-fit h-fit md:py-2 px-4 rounded-md md:text-[12px] text-white`}

              >
                  <span
                      id={'deferCohort'}
                      data-testid={'deferCohort'}
                      className={`${inter700.className}  text-white `}>Defer cohort</span>
                  <DropdownMenuTrigger
                      onClick={toggleArrow}
                      asChild>
                      {clickDrop ? (
                          <MdKeyboardArrowUp
                              id={'iconUp'}
                              onClick={() => setClickDrop(!clickDrop) }
                              className="h-5 w-5 mt-auto mb-auto text-white"
                          />                            ) : (
                          <MdKeyboardArrowDown
                              id={'iconDowm'}
                              onClick={() => setClickDrop(!clickDrop) }
                              className="h-5 w-5 mt-auto mb-auto text-white"/>

                      )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem
                          id={`dropOut`}
                          className={`hover:bg-error50 text-error500 hover:text-error500 `}>
                          Drop out
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </div>
            </DropdownMenu>

        </div>
    );
};

export default LoaneeProfileHeader;