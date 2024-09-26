import React from 'react';
import {Tabs} from "@mui/material";

const SelectLoanTab = () => {
    return (
        <div
            id="selectLoanTabContainer"
            className={`flex bg-[#fafbfc] w-[99%] ml-1 mt-1 md:w-[50%] h-[20%] md:h-[30%] md:rounded rounded- `}
        >
            <Tabs
                data-testid="selectLoanTabs"
                style={{display: 'flex',  alignItems: 'center', textAlign: 'center',
                    height: '99%', width: '99%', gap: '1rem', }}
                id="selectLoanTabs"
            >

            </Tabs>
        </div>
    );
};

export default SelectLoanTab;