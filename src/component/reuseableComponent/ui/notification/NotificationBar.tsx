import React, { useState, useEffect, useRef } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationBadge from "./NotificationBadge";
import NotificationPopup from "./NotificationPopup";

const NotificationBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Reference to the notification bar element
    const notificationRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsActive(!isActive);
        setIsModalVisible(!isModalVisible);
    };

    // Function to handle clicks outside the notification bar
    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setIsActive(false);
            setIsModalVisible(false);
        }
    };

    // Add event listener for detecting clicks outside the component
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id={'notificationBarBlock'} ref={notificationRef} className="relative" onClick={handleClick}>
            <NotificationsNoneOutlinedIcon sx={{color: isActive ? "#0D9B48" : "#101828"}} />
            {!isActive && <NotificationBadge />}
            {isModalVisible && (
                <div id={'notificationPopupBlock'} onClick={(e) => e.stopPropagation()}>
                    <NotificationPopup />
                </div>
            )} {/* Conditionally render the Modal */}
        </div>
    );
};

export default NotificationBar;