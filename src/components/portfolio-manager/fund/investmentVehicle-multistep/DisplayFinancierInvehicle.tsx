import React from 'react';


interface Props {
    list: []
}

const DisplayFinancierInvehicle = ({list}:Props ) => {
    return (
        <div>
            {list?.map((fina, index) => (
                <div key={index}
                     className={` md:flex grid gap-2 md:gap-4`}
                >
                    <div className={` w-full border border-[#e4e4e7] px-2 text-xs h-fit py-4  rounded-md `}>
                        {fina?.first}
                    </div>
                    <div
                        className={` w-full border border-[#e4e4e7] text-xs px-2 h-fit py-4  rounded-md `}
                    >
                        {fina.role}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayFinancierInvehicle;