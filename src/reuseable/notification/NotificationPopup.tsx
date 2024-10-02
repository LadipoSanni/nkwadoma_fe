import React from 'react';
import Image from 'next/image';
// import LoanOfferModal from "@/component/reuseableComponent/ui/modal/LoanOfferModal";

const notifications = [{
    title: 'Welcome to Learnspace!', date: 'Aug 29, 2024', time: '10:00 AM', isNew: true, buttonText: null,
}, {
    title: 'School of Design, Yaba sent you a loan offer',
    date: 'Aug 29, 2024',
    time: '10:00 AM',
    isNew: true,
    buttonText: 'View loan offer',
},];

const NotificationPopup = () => {
    // const [isModalVisible, setIsModalVisible] = useState(false);

    // const handleButtonClick = () => {
    //     setIsModalVisible(true);
    // };

    // const closeModal = () => {
    //     setIsModalVisible(false);
    // };

    return (
        <main id={'notificationInbox'}
              className="absolute top-0 -right-24 h-[279px] w-[378px] mt-10 bg-white rounded shadow-custom overflow-y-hidden">
            <header id={'notificationHeader'} className={'px-3 pt-5 pb-3'}>
                <h1 id={'notificationTitle'}
                    className={'text-learnSpaceDarkGray text-base font-medium leading-[120%]'}>Notifications</h1>
            </header>
            {notifications.map((notification, index) => (<section id={`notificationSection${index}`} key={index}
                                                                  className={`flex gap-4 px-3 py-5 ${index < notifications.length - 1 ? 'border-b border-b-MiddleGray' : ''}`}>
                <Image id={`notificationLogo${index}`} src={'/asset/image/learnspaceLogo.svg'} height={38} width={35} alt="" />
                <div id={`notificationContent${index}`} className={'grid gap-2 w-full'}>
                    <div id={`notificationHeader${index}`} className={'flex justify-between items-center w-full'}>
                        <h1 id={`notificationTitle${index}`}
                            className={'text-learnSpaceDarkGray text-[14px] font-normal leading-[120%] w-[218px]'}>{notification.title}</h1>
                        {notification.isNew && (<div id={`notificationNewBadge${index}`}
                                                     className={'flex justify-center items-center bg-primary-80 h-3.5 w-[1.9375rem] rounded-[18px]'}>
                            <p id={`notificationNewText${index}`}
                               className={'text-[10px] text-primary font-medium leading-[120%]'}>NEW</p>
                        </div>)}
                    </div>
                    <p id={`notificationDate${index}`}
                       className={'flex items-center text-[12px] text-[#91959C] gap-[7px] font-normal leading-[120%]'}>
                        {notification.date} <span><div id={`notificationDot${index}`}
                                                       className={'h-1 w-1 rounded-[100%] bg-MiddleGray'}></div></span> {notification.time}
                    </p>
                    {notification.buttonText && (<button id={`notificationButton${index}`}
                                                         className={`flex justify-center items-center bg-primary h-[33px] w-[113px] rounded`}>
                        <p id={`notificationButtonText${index}`}
                           className={'text-white text-[14px] not-italic font-medium leading-[120%]'}>
                            {notification.buttonText}
                        </p>
                    </button>)}
                </div>
            </section>))}
            {/*{isModalVisible && (<LoanOfferModal closeModal={closeModal}/>)}*/}
        </main>);
};

export default NotificationPopup;