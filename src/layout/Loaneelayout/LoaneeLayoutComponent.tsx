import React, {ReactNode} from 'react';
import SideBar from "@/components/side-bar";
import TopBar from "@/components/topBar";

interface LoaneeLayoutProps {
    children: ReactNode;
}

const LoaneeLayoutComponent: React.FC<LoaneeLayoutProps> = ({children}) => {
    return (
        <main data-testid="AcceptedTraineeDashboardMain" id="AccepTrMain"
              className="h-screen w-screen grid md:flex md:overflow-hidden md:relative md:w-screen md:h-screen">
            <SideBar/>
            <div data-testid={"AcceptedTraineeDashboardContainer"} id={"AcceptTrContainer"}
                 className=" grid h-[100vh] w-[100vw] md:h-full bg-[#f0f2f4] md:place-self-end ">
                <TopBar/>
                <div id={'TopBarAndCenterComponent'}
                     className={` w-[100%] absolute bottom-0 px-5 bg-gray md:pt-7 py-4 pb-6  h-[92%]  grid  md:w-[84vw] md:h-[90vh] `}>
                    <div data-testid="AcceptedTraineeDashboardContent" id="AcceptTrContent"
                         className="md:px-0 pl-3 pr-1.5 md:py-5 pt-3 h-full rounded-md bg-meedlWhite"
                         >
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoaneeLayoutComponent;