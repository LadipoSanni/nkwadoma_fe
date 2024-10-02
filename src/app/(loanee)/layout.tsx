import React, { ReactNode } from 'react';

interface LoaneeLayoutProps {
    children: ReactNode;
}

const LoaneeLayout: React.FC<LoaneeLayoutProps> = ({ children }) => {
    return (
        <main data-testid="AcceptedTraineeDashboardMain" id="AccepTrMain"
              className="flex h-screen bg-LearnSpaceAthensGray">
            {/*<NavigationSidebar/>*/}
            <div data-testid={"AcceptedTraineeDashboardContainer"} id={"AcceptTrContainer"}
                 className="flex flex-col flex-grow">
                {/*<DashboardHeader/>*/}
                <div data-testid="AcceptedTraineeDashboardContent" id="AcceptTrContent" className="px-5 py-8 h-full">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default LoaneeLayout;
