import React, {ReactNode} from 'react';
// import LoaneeLayoutComponent from '@/layout/Loaneelayout/LoaneeLayoutComponent'
// import CustomAuthorization from "@/features/auth/authorization";

interface LoaneeLayoutProps {
    children: ReactNode;
}

const LoaneeLayout: React.FC<LoaneeLayoutProps> = ({ children }) => {
    return (
        // <CustomAuthorization authorizedRoles={['LOANEE']}>
        //     <LoaneeLayoutComponent>
        <div>
            {children}
        </div>
            // </LoaneeLayoutComponent>
        // </CustomAuthorization>

    );
};

export default LoaneeLayout;
