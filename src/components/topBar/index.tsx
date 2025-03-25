"use client"

import React, { useState,useEffect} from 'react';
import { IoMdMenu } from "react-icons/io";
import { setShowMobileSideBar } from "@/redux/slice/layout/adminLayout";
import {inter500, inter} from "@/app/fonts";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { capitalizeFirstLetters, getFirstLetterOfWord } from "@/utils/GlobalMethods";
import { store, useAppSelector } from "@/redux/store";
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import AdminProfile from "@/features/profile/adminProfile/Index";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {setCurrentNavbarItem} from "@/redux/slice/layout/adminLayout";
import { useRouter,usePathname} from "next/navigation";
import { MdNotifications } from 'react-icons/md';
import { Button } from '../ui/button';
import { BellIcon } from '@radix-ui/react-icons';
import { Badge } from '../ui/badge';
import { useNumberOfNotificationQuery } from '@/service/notification/notification_query';
import { setCurrentTotalNotification } from '@/redux/slice/notification/notification';



const TopBar = () => {
    const [arrowToggled, setArrowToggled] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const currentTab = useAppSelector(state => state.adminLayout.currentNavbarItem);
    const user_role = getUserDetailsFromStorage('user_role');
    const user_name = getUserDetailsFromStorage("user_name");
     const router = useRouter();
     const pathname = usePathname();



    const {data,refetch} = useNumberOfNotificationQuery({})

    useEffect(()=>{
        if (data?.data?.allNotificationsCount !== undefined) {
            store.dispatch(setCurrentTotalNotification(data.data.allNotificationsCount));
        }        
        refetch()
    },[data,refetch])
     
   
    const toggleArrow = () => {
        setArrowToggled(!arrowToggled);
        setIsPopoverOpen(!isPopoverOpen);
    };

    const openMobileSideBar = () => {
        store.dispatch(setShowMobileSideBar(true));
    };

    const handleNotification = () => {
        router.push("/notifications/notification")
       store.dispatch(setCurrentNavbarItem('Notification'))  
    }
    
    const isNotificationPage = /^\/notifications(?:\/.*)?$/.test(pathname || "");


    


    return (
        <header
            id="adminlayoutHeader"
            className="bg-meedlWhite md:bg-meedlWhite  flex items-center h-[8vh] px-4 md:px-4 border-b border-b-[blue300] md:border-b md:border-b-[blue300] w-full  md:h-[12vh] md:w-[84vw] static md:static right-0 justify-between "
        >

        </header>
    );
};

export default TopBar;