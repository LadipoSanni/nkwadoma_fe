import React from 'react';


interface Props {
    height?: string,
    width?: string,
}

const Calender = ({height, width}: Props) => {
    return (
        <div>
            <svg  width={ width || `60`} height={ height || `60`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 5V15M20 5V15" stroke="#882204" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32.5 10H27.5C18.0719 10 13.3579 10 10.4289 12.9289C7.5 15.8579 7.5 20.5719 7.5 30V35C7.5 44.428 7.5 49.1422 10.4289 52.071C13.3579 55 18.0719 55 27.5 55H32.5C41.928 55 46.6422 55 49.571 52.071C52.5 49.1422 52.5 44.428 52.5 35V30C52.5 20.5719 52.5 15.8579 49.571 12.9289C46.6422 10 41.928 10 32.5 10Z" stroke="#882204" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 25H52.5" stroke="#882204" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29.9887 35H30.0113M29.9887 45H30.0113M39.9775 35H40M20 35H20.0224M20 45H20.0224" stroke="#882204" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
};

export default Calender;