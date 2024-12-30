"use client"
import React, {useEffect, useState} from 'react';
import {redirect, useRouter} from "next/navigation";
import {persistor, store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem, setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import Image from "next/image"
import NavbarRouter from "../../reuseable/ui/navbarRouter";
import {LuLogOut} from "react-icons/lu";
import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import NavbarContainer from "@/reuseable/ui/Navbar";
// import {GearIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {Icon} from "@iconify/react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {MdOutlineAccountBalance, MdOutlineInventory2,MdOutlineReceiptLong, MdOutlinePayments, MdOutlineBusinessCenter,MdOutlinePersonOutline, MdOutlinePeopleAlt,MdOutlineHome} from "react-icons/md";
import {useLogoutMutation} from "@/service/users/api";
import {clearData} from "@/utils/storage";





const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const current = useAppSelector(state => state.adminLayout.currentNavbarItem)
    const currentNavBottom = useAppSelector(state => state.adminLayout.currentNavBottomItem)
    const [logout] = useLogoutMutation()


    const [role, setRole] = useState('')
    const user_role = getUserDetailsFromStorage('user_role')
    // const access_token = getUserDetailsFromStorage('access_token')


    useEffect(() => {
        if (!user_role) {
            redirect("/auth/login")
        }else {
            setRole(user_role)
        }
    }, [user_role]);

    // console.log("acesss: ",access_token)



    const clickNavbar = (name: string, route?: string, isActive?: boolean) => {
        if (isActive){
            store.dispatch(setCurrentNavBottomItem(name))
            store.dispatch(setCurrentNavbarItem(name))
            if(route){
                router.push(route)
            }
        }

    }
    // const handleClick = (name?: string, id?: string) => {
    //     if (name && id) {
    //         store.dispatch(setCurrentNavBottomItem(name))
    //         store.dispatch(setCurrentNavbarItem(""))
    //         if (name !== 'Logout' && name !== "Help & Support") {
    //             clickNavbar(name, id)
    //         }
    //     }
    //
    // }
    const handleLogout =  async () => {
        store.dispatch(setCurrentNavBottomItem("Logout"))
        clearData()
        await persistor.purge();
     try{
          await logout({})
         router.push("/auth/login")
     }catch (error){
         console.log("error:: ", error)
     }
    }

    const currentTextLiterals = `text-[#626F8C]`;
    const textLiterals = `text-navbarIconColor`;


    const PORTFOLIO_MANAGER: navbarRouterItemsProps[] = [
        {

            icon: <MdOutlineHome
                color={'#d7d7d7'}
                // color={current === 'Overview' ? '#142854' : '#939cb0'}
                className={` h-[1.2rem] w-[1.2em] `}
            />,
            id: 'Overview',
            name: 'Overview',
            isActive: false,

            // route: '/overview'
        },
        {
            id: 'loan',
            name: 'Loan',
            route: '/loan',
            isActive: true,
            icon: <Icon icon="material-symbols:money-bag-outline"
                        height={"1.2rem"}
                        width={"1.2rem"}
                        // color={'#d7d7d7'}
                color={current === 'Loan' ? '#142854' : '#939cb0'}
            ></Icon>

        },
        {
            id: 'loanProduct',
            name: 'Loan Product',
            route: '/loan-product',
            isActive: true,
            icon: <MdOutlineInventory2
                // color={'#d7d7d7'}
                color={current === 'Loan Product' ? '#142854' : '#939CB0'}
                // className={` h-[1.2rem] w-[1.2rem]  `}
            ></MdOutlineInventory2>

        },
        {
            id: 'organizations',
            name: 'Organizations',
            route: '/organizations',
            isActive: true,
            icon: <MdOutlineAccountBalance
                className={` h-[1.2rem] w-[1.2em]  `}
                color={current === 'Organizations' ? '#142854' : '#939CB0'}
            ></MdOutlineAccountBalance>

        },
        {
            id: 'loanee',
            name: 'Loanee',
            // route: '/loanee',
            isActive: false,
            icon: <MdOutlinePersonOutline
                color={'#d7d7d7'}
                // color={current === 'Loanee' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]   `}/>
        },
        {
            id: 'funds',
            name: 'Funds',
            isActive: true,
             route: '/funds',
            icon: <MdOutlinePayments
                // color={'#d7d7d7'}
                color={current === 'Funds' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]  `}/>
        },
        {

            id: 'investors',
            name: 'Investors',
            isActive: false,
            // route: '/investors',
            icon: <MdOutlineBusinessCenter
                color={'#d7d7d7'}
                // color={current === 'Investors' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]  `}/>
        },


    ]

    const LOANEE : navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'overview',
            isActive: true,
            name: "Overview",
            route: '/overview'
        },
        {
            icon: <MdOutlineReceiptLong
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'transaction',
            name: "Transaction",
            isActive: true,
            route: '/transaction'
        },
        {
            icon: <Icon
                icon='iconoir:hand-cash'
                color={current === 'Loan' ? '#142854' : '#667085'}
                height={"1.2rem"}
                width={"1.3rem"}
            />,
            id: 'repayment',
            isActive: true,
            name: "Repayment",
            route: '/repayment'
        },


    ]

    const INSTITUTION_ADMIN: navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                // color={'#fdfdfd'}
                color={'#d7d7d7'}
                className={`h-[1.2rem] w-[1.2rem]`}
                // className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'Overview',
            name: 'Overview',
            // route: '/Overview'
            isActive: false
        },
        {
            id: 'program',
            name: 'Program',
            route: '/program',
            isActive: true,
            icon: <Icon
                icon="mynaui:book"
                color={current === 'Program' ? '#142854' : '#667085'}
                height={"1.2rem"}
                width={"1.3rem"}
            >

            </Icon>
        },
        {
            id: 'cohort',
            name: 'Cohort',
            route: '/cohort',
            isActive: true,
            icon: <MdOutlinePeopleAlt
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}/>
        },
        {
            id: 'loan',
            name: 'Loan',
            // route: '/loan',
            isActive: false,
            icon: <Icon icon="material-symbols:money-bag-outline"
                        height={"1.2rem"}
                        width={"1.3rem"}
                        // color={'#fdfdfd'}
                        color={'#d7d7d7'}
                        className={`h-[1.2rem] w-[1.2rem]`}
                        // color={current === 'Loan' ? '#142854' : '#667085'}
            ></Icon>

        },
        {
            id: 'loanee',
            name: 'Loanee',
            isActive: false,
            // route: '/loanee',
            icon: <MdOutlinePersonOutline
                color={'#d7d7d7'}
                className={`h-[1.2rem] w-[1.2rem]`}
                // className={` h-[1.2rem] w-[1.2rem] ${current === 'Loanee' ? currentTextLiterals : textLiterals} `}
                />
        },
    ]

    const navbarContainerItems: navbarItemsProps[] = [
        // {
        //     id: 'settings',
        //     name: 'Settings',
        //     icon: <GearIcon
        //         color={currentNavBottom === 'Settings' ? '#142854' : '#939CB0'}
        //         className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
        //     handleClick: handleClick
        // },
        // {
        //     id: 'help&support',
        //     name: "Help & Support",
        //     icon: <QuestionMarkCircledIcon
        //         color={currentNavBottom === "Help & Support" ? '#142854' : '#939CB0'}
        //         className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
        //     handleClick: handleClick
        // },
        {
            id: 'logout',
            name: 'Logout',
            icon: <LuLogOut
                color={currentNavBottom === "Logout" ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem] `}/>,
            handleClick: handleLogout
        },

    ]

    const sideBarContent = [
        {name: "PORTFOLIO_MANAGER", value: PORTFOLIO_MANAGER},
        {name: "ORGANIZATION_ADMIN", value: INSTITUTION_ADMIN},
        {name: 'LOANEE', value: LOANEE }
    ]

    const getUserSideBarByRole = (userrole: string): navbarRouterItemsProps[] | undefined => {
        for (let i = 0; i < sideBarContent.length; i++) {
            if (sideBarContent.at(i)?.name === userrole) {
                if (sideBarContent.at(i)?.value) {
                    return sideBarContent.at(i)?.value as navbarRouterItemsProps[]
                }
            }
        }
    }
    const closeSideBar = () => {
        store.dispatch(setShowMobileSideBar(false))

    }



    return (
        <div className={` absolute bottom-0 grid md:static   `}>
            {showMobileSideBar &&
                <div
                    id={'adminMobileSideBar'}
                    className={` z-40 w-[100vw] overflow-hidden h-[100vh]  border-r-2 border-r-grey-200  flex md:hidden`}
                >

                    <div
                        className={` w-[70%] bg-white py-2 px-5 border border-r-grey-200 z-10 h-[100%] bg-learnSpaceWhite `}
                    >
                        <div className={`md:h-fit py-6 md:w-full   md:grid   `}>
                            <Image
                                id={'meddleMainLogoOnAdminLayout'}
                                data-testid={'meddleMainLogoOnAdminLayout'}
                                width={100}
                                height={50}
                                style={{marginTop: 'auto', marginBottom: 'auto'}}
                                src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                            />

                        </div>
                        <div className={`  grid h-fit  w-full `}>
                            <NavbarRouter currentTab={current} handleClick={clickNavbar}
                                          navbarItems={getUserSideBarByRole(role)}/>
                            < NavbarContainer current={currentNavBottom} items={navbarContainerItems}/>
                        </div>
                    </div>
                    <button data-testid="blurry" id="sideBarblurBackground"
                            className={` grid md:hidden   h-[100%] w-[40%] z-10 bg-[#717987] opacity-30 `}
                            onClick={closeSideBar}
                    ></button>
                </div>
            }
                <aside
                    id={'adminMediumSideBar'}
                    data-testid={'adminMediumSideBar'}
                    className={`hidden md:grid  md:bg-meedlWhite md:w-[16vw]  md:px-4  md:border-r md:border-r-[blue300] md:z-0 md:h-[100%]`}
                >
                    <div className={`  md:grid md:gap-4    md:h-fit `}>
                        <div className={`md:h-[10vh] md:mt-auto md:mb-auto md:w-full   md:grid   `}>
                            <Image
                                id={'meddleMainLogoOnAdminLayout'}
                                data-testid={'meddleMainLogoOnAdminLayout'}
                                width={100}
                                height={50}
                                style={{marginTop: 'auto', marginBottom: 'auto'}}
                                src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                            />
                        </div>
                        <div className={` hidden  md:grid md:h-fit  md:w-full `}>
                            <NavbarRouter currentTab={current} handleClick={clickNavbar}
                                          navbarItems={getUserSideBarByRole(role)}/>
                        </div>
                    </div>

                    <div className={`md:absolute md:grid m md:bottom-5 gap-3  md:h-fit `}>
                        <div className={` hidden md:grid  md:h-fit  md:w-full `}>
                            < NavbarContainer current={currentNavBottom} items={navbarContainerItems}/>
                        </div>
                        {/*<div*/}
                        {/*    className={`h-fit w-full border-t-2  border-t-navBorder`}*/}
                        {/*>*/}
                        {/*    <div*/}
                        {/*        className={`h-fit w-full flex gap-2 pt-4 pb-12`}*/}
                        {/*    >*/}
                        {/*        <div*/}
                        {/*            className={` md:grid  md:place-items-center px-3 py-3 md:object-fit md:text-black md:text-xs md:font-bold  md:bg-[#F7F7F7]   md:rounded-full w-[30px] h-[30px]  md:w-[3.5rem] md:h-[3.5rem] `}>*/}
                        {/*                <Image*/}
                        {/*                    id={'meddleMainLogoOnAdminLayout'}*/}
                        {/*                    data-testid={'meddleMainLogoOnAdminLayout'}*/}
                        {/*                    width={100}*/}
                        {/*                    height={100}*/}
                        {/*                    style={{marginTop: 'auto', marginBottom: 'auto'}}*/}
                        {/*                />*/}
                        {/*        </div>*/}
                        {/*        <div className={`grid  mt-auto mb-auto h-[3rem]`}>*/}
                        {/*            <div className={`  text-black text-base`}>Alt school Africa </div>*/}
                        {/*            <p className={` text-gray1 text-sm `}>Education</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </aside>


        </div>
    );
};

export default SideBar;