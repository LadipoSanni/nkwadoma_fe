import React from 'react';

interface Props {
    height?: string,
    width?: string,
}
const Connect = ({height, width}: Props) => {
    return (
        <div>
            <svg width={ width || "60"} height={ height || "60"} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 33.0725C25.354 33.6523 25.7742 34.201 26.2605 34.707C29.2792 37.8488 33.8805 38.34 37.394 36.1805C38.045 35.7803 38.6585 35.2893 39.218 34.707L47.3165 26.2785C50.8945 22.5546 50.8945 16.5169 47.3165 12.793C43.7382 9.069 37.937 9.06903 34.3587 12.793L32.575 14.6495" stroke="#142854" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M27.4258 45.35L25.6413 47.207C22.0632 50.931 16.2618 50.931 12.6836 47.207C9.10546 43.483 9.10546 37.4455 12.6836 33.7215L20.7822 25.293C24.3603 21.569 30.1618 21.569 33.7398 25.293C34.226 25.7987 34.646 26.3475 35 26.927" stroke="#142854" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default Connect;