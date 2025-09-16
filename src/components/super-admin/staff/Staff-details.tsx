'use client'
import React from 'react'
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation';
import InfoImageBanner from '@/reuseable/details/tab-connector/InfoImageBanner';
import InfoPanel from '@/reuseable/details/InfoPanel';
import { formatMonthInDate } from '@/utils/Format'

function StaffDetails() {

    const router = useRouter()

    const handleBackToAllStaffClick = () => {
        router.push('/staff/all')
    }
   

    const staffMember = {
      fullName: "Nnenna ojukwu",
      emailAddress: "jane.smith@company.com",
      Role: "Portfolio Manager",
      invited: "2023-11-15",
      status: "Deactivated"
    };

    const detailInfo = [
      {name: 'Status', value: staffMember?.status},
      {name: 'Email address', value: staffMember?.emailAddress},
      {name: 'Role', value: staffMember?.Role},
      {name: 'Invited', value: formatMonthInDate(staffMember?.invited)},
      
      
 ]

  return (
    <main className='md:px-10 px-4 mt-2'>
       <div  className=' md:py-3  py-4 mt-3'>
        <BackButton 
        id={'backToStaff'} 
        textColor={'meedlBlue'} 
        text={"Back to staff"} 
        iconBeforeLetters={true}
        handleClick={handleBackToAllStaffClick}
        />
       </div>
        <section id="bannerSection" className='grid gap-9 md:gap-0 md:flex  md:justify-between mt-5'>
          <div className='w-full'>
          <InfoImageBanner
          handleOpenModal={()=>{}}
          fullName={staffMember?.fullName}
          buttonName='Deactivated'
        />
          </div>
        <div className={`relative w-full md:pt-0 pt-0`} >
        <InfoPanel 
        infoList={detailInfo}
        className='md:py-1 py-4 md:h-64'
        />
        </div>
        </section>
    </main>
  )
}

export default  StaffDetails
