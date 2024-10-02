import React from 'react';

interface NotificationIconProps {
    colour: string
}

const NotificationIcon = ({colour}: NotificationIconProps) => {
    return (
        <svg id={'NotificationIcon'} className={'cursor-pointer'} width="26" height="26" viewBox="0 0 26 26" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.5 8.66663C19.5 6.94272 18.8152 5.28942 17.5962 4.07043C16.3772 2.85145 14.7239 2.16663 13 2.16663C11.2761 2.16663 9.62279 2.85145 8.40381 4.07043C7.18482 5.28942 6.5 6.94272 6.5 8.66663C6.5 16.25 3.25 18.4166 3.25 18.4166H22.75C22.75 18.4166 19.5 16.25 19.5 8.66663Z"
                stroke={colour} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M14.8742 22.75C14.6837 23.0783 14.4104 23.3509 14.0814 23.5403C13.7525 23.7298 13.3796 23.8295 13 23.8295C12.6204 23.8295 12.2475 23.7298 11.9186 23.5403C11.5897 23.3509 11.3163 23.0783 11.1259 22.75"
                stroke={colour} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    );
};

export default NotificationIcon;
