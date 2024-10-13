import React from 'react';
import SelectedLoan from "@/components/selectedLoan/SelectedLoan";

// type props = {
//     children: React.ReactNode;
// }

export default function Layout  ({children}: Readonly<{
    children: React.ReactNode;
}>)  {
    return (
        // eslint-disable-next-line react/no-children-prop
        <SelectedLoan children={children}/>
    );
};

