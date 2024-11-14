import React from 'react';
import { IoEllipseOutline } from "react-icons/io5";

const Connector = () => {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <IoEllipseOutline className={'h-5 w-5 stroke-1 stroke-meedlBlue'}/>
            <div className="rounded-[2px] h-8 w-px bg-blue100"></div>
        </div>
    );
};

export default Connector;