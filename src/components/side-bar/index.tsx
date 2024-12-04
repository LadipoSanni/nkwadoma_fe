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
import {GearIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {Icon} from "@iconify/react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {MdOutlineAccountBalance, MdOutlineInventory2,MdOutlineReceiptLong, MdOutlinePayments, MdOutlineBusinessCenter,MdOutlinePersonOutline, MdOutlinePeopleAlt,MdOutlineHome} from "react-icons/md";
import {useLogoutMutation} from "@/service/users/api";





const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const current = useAppSelector(state => state.adminLayout.currentNavbarItem)
    const currentNavBottom = useAppSelector(state => state.adminLayout.currentNavBottomItem)
    const [logout] = useLogoutMutation()


    const [role, setRole] = useState('')
    const user_role = getUserDetailsFromStorage('user_role')

    useEffect(() => {
        if (!user_role) {
            redirect("/auth/login")
        }else {
            setRole(user_role)
        }
    }, [user_role]);


    const [currentTab, setCurrentTab] = React.useState(current)

    const clickNavbar = (name: string, id: string) => {
        setCurrentTab(name)
        store.dispatch(setCurrentNavBottomItem(name))
        store.dispatch(setCurrentNavbarItem(name))
        router.push("/" + id)

    }
    const handleClick = (name?: string, id?: string) => {
        if (name && id) {
            store.dispatch(setCurrentNavBottomItem(name))
            store.dispatch(setCurrentNavbarItem(""))
            if (name !== 'Logout' && name !== "Help & Support") {
                clickNavbar(name, id)
            }
        }

    }
    const handleLogout =  async () => {
        store.dispatch(setCurrentNavBottomItem("Logout"))
        await persistor.purge();
     try{
          await logout({})
         router.push("/auth/login")
     }catch (error){
         console.log("error: ", error)
         router.push("/auth/login")

     }
    }

    const currentTextLiterals = `text-[#626F8C]`;
    const textLiterals = `text-navbarIconColor`;


    const PORTFOLIO_MANAGER: navbarRouterItemsProps[] = [
        {

            icon: <MdOutlineHome
                color={current === 'Overview' ? '#142854' : '#939cb0'}
                className={` h-[1.2rem] w-[1.2em] `}/>,
            id: 'Overview',
            name: 'Overview',
            route: '/overview'
        },
        {
            id: 'loan',
            name: 'Loan',
            route: '/loan',
            icon: <Icon icon="material-symbols:money-bag-outline"
                        height={"1.2rem"}
                        width={"1.2rem"}
                        color={current === 'Loan' ? '#142854' : '#939cb0'}
            ></Icon>

        },
        {
            id: 'loanProduct',
            name: 'Loan Product',
            route: '/loan-product',
            icon: <MdOutlineInventory2

                color={current === 'Loan Product' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]  `}
            ></MdOutlineInventory2>

        },
        {
            id: 'organizations',
            name: 'Organizations',
            route: '/organizations',
            icon: <MdOutlineAccountBalance
                className={` h-[1.2rem] w-[1.2em]  `}
                color={current === 'Organizations' ? '#142854' : '#939CB0'}
            ></MdOutlineAccountBalance>

        },
        {
            id: 'loanee',
            name: 'Loanee',
            route: '/loanee',
            icon: <MdOutlinePersonOutline
                color={current === 'Loanee' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]   `}/>
        },
        {
            id: 'funds',
            name: 'Funds',
            route: '/funds',
            icon: <MdOutlinePayments
                color={current === 'Funds' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]  `}/>
        },
        {

            id: 'investors',
            name: 'Investors',
            route: '/investors',
            icon: <MdOutlineBusinessCenter
                color={current === 'Investors' ? '#142854' : '#939CB0'}
                className={` h-[1.2rem] w-[1.2rem]  `}/>
        },


    ]

    const LOANEE : navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'overview',
            name: "Overview",
            route: '/overview'
        },
        {
            icon: <MdOutlineReceiptLong
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'transaction',
            name: "Transaction",
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
            name: "Repayment",
            route: '/repayment'
        },


    ]

    const INSTITUTION_ADMIN: navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}/>,
            id: 'Overview',
            name: 'Overview',
            route: '/Overview'
        },
        {
            id: 'program',
            name: 'Program',
            route: '/program',
            icon: <Icon
                icon="mynaui:book"
                color={current === 'Loan' ? '#142854' : '#667085'}
                height={"1.2rem"}
                width={"1.3rem"}
            >

            </Icon>
        },
        {
            id: 'cohort',
            name: 'Cohort',
            route: '/cohort',
            icon: <MdOutlinePeopleAlt
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}/>
        },
        {
            id: 'loan',
            name: 'Loan',
            route: '/loan',
            icon: <Icon icon="material-symbols:money-bag-outline"
                        height={"1.2rem"}
                        width={"1.3rem"}
                        color={current === 'Loan' ? '#142854' : '#667085'}
            ></Icon>

        },
        {
            id: 'loanee',
            name: 'Loanee',
            route: '/loanee',
            icon: <MdOutlinePersonOutline
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Loanee' ? currentTextLiterals : textLiterals} `}/>
        },
    ]

    const navbarContainerItems: navbarItemsProps[] = [
        {
            id: 'settings',
            name: 'Settings',
            icon: <GearIcon
                color={currentNavBottom === 'Settings' ? '#142854' : '#939CB0'}
                className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
            handleClick: handleClick
        },
        {
            id: 'help&support',
            name: "Help & Support",
            icon: <QuestionMarkCircledIcon
                color={currentNavBottom === "Help & Support" ? '#142854' : '#939CB0'}
                className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
            handleClick: handleClick
        },
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
                            <NavbarRouter currentTab={currentTab} handleClick={clickNavbar}
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
                            <NavbarRouter currentTab={currentTab} handleClick={clickNavbar}
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
                        {/*                    src={'data:image/png;base64,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'} alt={'meedleYellowLogo'}*/}
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