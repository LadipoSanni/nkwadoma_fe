import React, {ReactNode} from 'react';
import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";

interface LoaneeLayoutProps {
    children: ReactNode;
}

const LoaneeLayoutComponent: React.FC<LoaneeLayoutProps> = ({children}) => {
    return (
        <main data-testid="AcceptedTraineeDashboardMain" id="AccepTrMain"
              className="flex h-screen bg-LearnSpaceAthensGray">
            <SideBar/>
            <div data-testid={"AcceptedTraineeDashboardContainer"} id={"AcceptTrContainer"}
                 className="flex flex-col flex-grow bg-gray">
                <TopBar/>
                <div className={'px-5 pt-7 pb-6 h-full w-full'}>
                    <div data-testid="AcceptedTraineeDashboardContent" id="AcceptTrContent"
                         className="px-10 py-5 h-full rounded-md bg-meedlWhite">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoaneeLayoutComponent;