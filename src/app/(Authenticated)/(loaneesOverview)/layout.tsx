import React from 'react';
import TabSwitch from "@/layout/tabLayout";
import styles from "@/components/loanee-my-profile/index.module.css";
import {loaneeView} from "@/types/tabDataTypes";

interface Props {
    children: React.ReactNode;
}
const Layout = ({children}:Props) => {
    return (
        <TabSwitch triggerStyle={styles.switchTabStyle} tabData={loaneeView} defaultTab="/loanees" disabledTabs={[]}>
            <div className={` max-h-[78vh] ${styles.verticalContainer}`}>
                {children}
            </div>
        </TabSwitch>
    );
};

export default Layout;