import React from 'react';

interface IProps {
    width?:string;
    height?:string;
}

const FundWalletBigIcon = ({width, height}: IProps) => {
    return (
        <div>
            <svg width={width || `60`} height={ height || `60`} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 53.75H37.5C44.571 53.75 48.1065 53.75 50.3032 51.5532C52.5 49.3565 52.5 45.821 52.5 38.75V36.25C52.5 29.179 52.5 25.6435 50.3032 23.4467C48.1065 21.25 44.571 21.25 37.5 21.25H7.5V33.75" stroke="#882204" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M37.5 21.2458V10.2758C37.5 8.0524 35.6975 6.25 33.4742 6.25C32.834 6.25 32.203 6.4027 31.6335 6.69545L9.40575 18.1232C8.2356 18.7248 7.5 19.9301 7.5 21.2458" stroke="#882204" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M43.75 38.75C44.4403 38.75 45 38.1903 45 37.5C45 36.8097 44.4403 36.25 43.75 36.25M43.75 38.75C43.0597 38.75 42.5 38.1903 42.5 37.5C42.5 36.8097 43.0597 36.25 43.75 36.25M43.75 38.75V36.25" stroke="#882204" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 45H16.25M16.25 45H7.5M16.25 45V36.25M16.25 45V53.75" stroke="#882204" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
};

export default FundWalletBigIcon;