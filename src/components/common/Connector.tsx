import React from 'react';
import {IoEllipseOutline} from "react-icons/io5";
import {MdCheckCircle} from "react-icons/md";

interface ConnectorProps {
    showLine?: boolean;
    isActive?: boolean;
    isCompleted?: boolean;
}

const Connector = ({showLine, isActive, isCompleted}: ConnectorProps) => {
    return (
        <div className="flex flex-col items-center gap-0.5">
            {
                isCompleted ? <MdCheckCircle className={'h-5 w-5 text-meedlBlue'}/>
                    : <IoEllipseOutline
                        className={`h-5 w-5 stroke-1 ${isActive || isCompleted ? 'stroke-meedlBlue' : 'stroke-blue100'}`}/>

            }
            {/*<IoEllipseOutline className={`h-5 w-5 stroke-1 ${isActive || isCompleted ? 'stroke-meedlBlue' : 'stroke-blue100'}`} />*/}
            {/*<MdCheckCircle className={'h-5 w-5 text-meedlBlue'} />*/}
            {showLine &&
                <div className={`rounded-[2px] h-8 w-px ${isCompleted ? 'bg-meedlBlue' : 'bg-blue100 '}`}></div>}
        </div>
    );
};

export default Connector;