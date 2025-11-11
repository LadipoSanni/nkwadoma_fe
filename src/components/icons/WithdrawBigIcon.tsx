import React from 'react';

interface Props {
    height?:  string;
    width?:  string;
}

const WithdrawBigIcon = ({height,width}:Props) => {
    return (
        <div>
            <svg width={ width || "60"} height={height ||"60"} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.3373 34.8633L45.6615 25.742C44.9378 21.8024 44.5758 19.8326 43.1425 18.6663C41.7093 17.5 39.6505 17.5 35.533 17.5H24.4671C20.3495 17.5 18.2907 17.5 16.8574 18.6663C15.4242 19.8326 15.0623 21.8024 14.3384 25.742L12.6626 34.8633C11.1602 43.0405 10.409 47.1292 12.7222 49.8147C15.0355 52.5 19.3089 52.5 27.8557 52.5H32.1443C40.6913 52.5 44.9645 52.5 47.2778 49.8147C49.591 47.1292 48.8398 43.0405 47.3373 34.8633Z" stroke="#882204" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M30 26.25V42.5M23.75 37.5L30 43.75L36.25 37.5" stroke="#882204" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
                <path d="M52.5 27.5C52.892 27.3023 53.2327 27.053 53.5355 26.7388C55 25.2188 55 22.7723 55 17.8794C55 12.9865 55 10.5401 53.5355 9.02003C52.071 7.5 49.714 7.5 45 7.5H15C10.286 7.5 7.92892 7.5 6.46447 9.02003C5 10.5401 5 12.9865 5 17.8794C5 22.7723 5 25.2188 6.46447 26.7388C6.7672 27.053 7.10805 27.3023 7.5 27.5" stroke="#882204" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

        </div>
    );
};

export default WithdrawBigIcon;