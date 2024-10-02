import React, {ReactNode} from 'react';
import LoaneeLayoutComponent from '@/layout/Loaneelayout/LoaneeLayoutComponent'

interface LoaneeLayoutProps {
    children: ReactNode;
}

const LoaneeLayout: React.FC<LoaneeLayoutProps> = ({ children }) => {
    return (
        <LoaneeLayoutComponent>
            {children}
        </LoaneeLayoutComponent>

    );
};

export default LoaneeLayout;
