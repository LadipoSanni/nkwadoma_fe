"use client"
import React from 'react';

interface props {
    tabNames: string[],

}

const TabConnector = ({tabNames}:props) => {
    return (
        <div
            id={`tabConnectContainer`}
            data-testid={`tabConnectContainer`}
            className={`w-fit flex  h-fit`}
        >
            {tabNames.map((tab, index)=> (
                <div  key={index + tab}
                      className={`flex items-center`}
                >
                    <div
                        data-testid={"tab" + tab}
                        id={"tab" + tab}
                        className={` border md:border border-meedlBlue md:border-meedlBlue rounded-full w-fit h-auto md:w-auto md:h-fit md:rounded-full text-sm ${index === 0 ? `bg-[#eef5ff]` : `bg-[#eef5ff]` } bg-[#eef5ff] px-2 py-1   `}
                    >
                        <span className={`flex gap-1 text-nowrap whitespace-nowrap text-sm w-object-fit md:w-auto md:text-sm`}>{tab}</span>
                    </div>
                    {index +1 < tabNames.length &&
                        <span
                            className={` w-[20px] md:w-[6rem] h-[2px] md:h-[1px] ${index === 1 ? `bg-grey500` :`bg-[#142854]` } `}></span>
                    }
                </div>


            ))
            }

        </div>
    );
};

export default TabConnector;