import {navbarItemsProps} from "@/types/Component.type";
import {MdOutlineHome, MdOutlinePeopleAlt} from "react-icons/md";
import {LuBook, LuPanelTop} from "react-icons/lu";
import {GoPerson} from "react-icons/go";

export const NavbarItemsInitialState : navbarItemsProps[] = [
    {icon: <MdOutlineHome/> , id: 'adminOverview', name: 'Overview', route: '/overview'},
    {id: 'program', name: 'Program', route: '/program', icon: <LuBook/>},
    {id: 'cohort', name: 'Cohort', route: '/cohort', icon:<MdOutlinePeopleAlt/>},
    {id: 'loan', name: 'Loan', route: '/loan', icon:<LuPanelTop/>},
    {id: 'trainee', name: 'Trainee', route: '/trainee',icon:<GoPerson/>},
]