import React from 'react';
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {inter} from "@/app/fonts";
import {
    // MdOutlinePersonOutline,
    MdOutlineAccountBalance} from "react-icons/md";
import {useRouter} from "next/navigation";
import {store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";

interface AdminProfileProps {
    closePopover: () => void
}

const AdminProfile: React.FC<AdminProfileProps> = ({closePopover}: AdminProfileProps) => {
    const user_name = getUserDetailsFromStorage("user_name");
    const user_role = getUserDetailsFromStorage('user_role');
    const router = useRouter()
    const current = useAppSelector(state => state.adminLayout.currentNavbarItem)


    const handleOrganizationRoute = () => {
        store.dispatch(setCurrentNavBottomItem('Organizations'))
        store.dispatch(setCurrentNavbarItem('Organizations'))
        router.push('/organizations/organizations-details')
        closePopover()
    }


    return (
        <main className={`${inter.className} grid gap-2`}>
            <div className={'flex items-center gap-2 pt-1 pb-5 border-b-[0.5px] border-solid border-b-blue550 '}>
                <div
                    className={`flex items-center justify-center bg-[#E0FDEB] rounded-full   w-[40px] h-[40px]   `}>
                    <p className={'text-[#29804B] text-[16px] font-normal leading-[150%]'}>{getFirstLetterOfWord(user_name)}</p>
                </div>
                <div className={'grid gap-1'}>
                    <p className={'text-black500 text-[14px] font-medium leading-[150%] '}>{capitalizeFirstLetters(user_name)}</p>
                    <p className={`text-black400 text-[14px] font-normal leading-[150%] `}>{capitalizeFirstLetters(user_role?.replace("_", " "))}</p>
                </div>
            </div>
            <div className={'flex flex-col items-start'}>
                {/*<section className={'group w-full'}>*/}
                {/*    <div*/}
                {/*        className={'group-hover:bg-tagButtonColor flex rounded cursor-pointer select-none w-full h-11 gap-2 p-[12px_8px] items-center'}>*/}
                {/*        <MdOutlinePersonOutline className={'text-primary200 group-hover:text-meedlBlue h-5 w-5'}/>*/}
                {/*        <p className={'text-blue300 group-hover:text-meedlBlue text-[14px] group-hover:font-medium  font-normal leading-[150%]'}>Your*/}
                {/*            profile</p>*/}
                {/*    </div>*/}
                {/*</section>*/}
                <section onClick={handleOrganizationRoute} className={'group w-full '}>
                    <div
                        className={'group-hover:bg-tagButtonColor flex rounded cursor-pointer select-none h-11 gap-2 p-[12px_8px] items-center'}>
                        <MdOutlineAccountBalance className={'text-primary200 group-hover:text-meedlBlue h-5 w-5'}/>
                        <p className={'text-blue300 group-hover:text-meedlBlue text-[14px] group-hover:font-medium leading-[150%] font-normal'}>Your
                            Organization</p>
                    </div>
                </section>
            </div>
        </main>
    )
        ;
};

export default AdminProfile;