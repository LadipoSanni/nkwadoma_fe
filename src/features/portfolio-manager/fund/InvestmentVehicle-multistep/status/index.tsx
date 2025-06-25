"use client";
import React from 'react'
import Status from '@/components/portfolio-manager/fund/investmentVehicle-multistep/Status'
import {useAppSelector} from "@/redux/store";



function InvestmentVehicleStatus() {
    const changeStatus = useAppSelector(state => (state?.vehicle?.setEditStatus))
  return (
    <div>
      <Status disabledTabs={changeStatus !== "changeStatus" ? ["coupon","closure"] : undefined}/>
    </div>
  )
}

export default InvestmentVehicleStatus
