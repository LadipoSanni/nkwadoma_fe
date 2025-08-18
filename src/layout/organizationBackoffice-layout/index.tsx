'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import {cabinetGrotesk} from "@/app/fonts";
import { organizationDetailTab } from '@/types/tabDataTypes'
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import { capitalizeFirstLetters} from "@/utils/GlobalMethods";

interface props {
    children: React.ReactNode;
}

function  OrganizationBackOfficeDetailLayout({children}:props) {
            const user_name = getUserDetailsFromStorage("user_name");
            const orgName = capitalizeFirstLetters(user_name)

  return (
    <div>
        <div className={`md:px-10 px-8 mt-4 text-[28px] font-medium ${cabinetGrotesk.className}`}>
            {orgName}
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

