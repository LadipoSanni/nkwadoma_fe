'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import {cabinetGrotesk} from "@/app/fonts";
import { organizationDetailTab } from '@/types/tabDataTypes'
import { capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useAppSelector } from '@/redux/store';
import {Skeleton} from '@/components/ui/skeleton'

interface props {
    children: React.ReactNode;
}

function  OrganizationBackOfficeDetailLayout({children}:props) {
            const user_name = useAppSelector(state => state?.organization?.organizationName)
            const orgName = capitalizeFirstLetters(user_name)

  return (
    <div>
        <div className={`md:px-10 px-8 mt-4 text-[28px] font-medium ${cabinetGrotesk.className}`}>
            { !orgName?  <Skeleton className="h-11  w-60 rounded-full bg-[#F6F6F6] mt-2 mb-2"/> : orgName}
        </div>
        <div className={`relative  "bottom-0"}`}>
        <TabSwitch tabData={organizationDetailTab} defaultTab='/organizations/organizations-details/details' >
      {children}
      </TabSwitch>
  </div>
    </div>
  )
}

export default OrganizationBackOfficeDetailLayout

