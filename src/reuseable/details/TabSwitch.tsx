import React from 'react';
import styles from "@/components/selected-loan/SelectedLoan.module.css";

interface props {
    tabContent: string[],
    currentTab: string | number,
    componentId: string,
    handleChange: ( index: number) => void

}
interface menuItemsProps {
    name: string,
    index: number,
    handleChange: (index: number) => void
}

const TabSwitch = ({tabContent, currentTab, componentId, handleChange}: props) => {

    function  MenuItem(props: menuItemsProps) {
        const {name, index, handleChange} = props
        return (
            <button
                id="TabSwitchStatusBox"
                data-testid="TabSwitchStatusBox"
                style={{textTransform: 'none', color: 'black'}}
                className={` py-1 flex px-2 place-self-center mr-auto ml-auto text-sm ${currentTab === index ? `  rounded-md border px-2 border-[#e5e8ec] ${styles.selectedLoan}` : `text-black300`}`}
                onClick={() => {
                    handleChange( index)
                }}
            >
                <div
                    data-testid={'TabSwitchStatusBoxName'}
                    id={"TabSwitchStatusBoxName"}
                    className={`flex gap-1 text-nowrap whitespace-nowrap text-sm w-object-fit md:w-auto md:text-sm`}
                >{name}</div>

            </button>
        )
    }

    return (
        <div
            id={componentId}
            data-testid={componentId}
            className={` ${styles.tab} flex bg-[#fafbfc]  w-auto ml-1 mt-1 md:w-fit h-fit md:h-fit md:rounded-md rounded-md `}
        >
            {tabContent?.map((item, index) => (
                <div
                    key={item}
                    id={"index" + item}
                    data-testid={"index" + item}
                    className={`flex place-self-center w-auto  md:h-auto md:px-2 md:w-auto `}
                >
                    <MenuItem name={item} index={index} handleChange={handleChange}/>
                </div>
            ))}
        </div>
    );
};

export default TabSwitch;