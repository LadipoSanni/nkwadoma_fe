"use client"
import React, {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import LoneeProfile from "@/reuseable/profile/LoneeProfile";
import NotificationBar from "@/reuseable/notification/NotificationBar";
// import MenuIcon from '@mui/icons-material/Menu';
// import MobileNavigationSidebar from "./MobileNavigationSidebar";

const DashboardHeader = () => {
    const pathname = usePathname();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const getHeaderTitle = () => {
        return pathname;
    }

    // const toggleModal = () => {
    //     setIsModalVisible(!isModalVisible);
    // }

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header id="dashboardHeaderTrainee"
                className="bg-white p-5 flex items-center justify-between border-b border-gray-300">
            <div className={'flex gap-3'}>
                {/*<MenuIcon className={'md:hidden'} onClick={toggleModal} />*/}
                <h1 id="headerTitleTrainee"
                    className="text-[16px] font-medium leading-[120%] text-[#101828]">{getHeaderTitle()}</h1>
            </div>
            <div id="TraineeProfileAndNotification" className="flex items-center gap-5 md:gap-10">
                <NotificationBar />
                <LoneeProfile />
            </div>
            {isModalVisible && (
                <div ref={modalRef} id={'mobileNavBlock'} className="fixed inset-0 flex md:hidden bg-learnSpaceSlateGray z-50">
                    {/*<MobileNavigationSidebar isVisible={isModalVisible} onClose={toggleModal} />*/}
                </div>
            )}
        </header>
    );
};

export default DashboardHeader;