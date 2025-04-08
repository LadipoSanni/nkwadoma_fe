"use client";
import React from 'react'
import Status from '@/components/portfolio-manager/fund/investmentVehicle-multistep/Status'


function InvestmentVehicleStatus() {
  return (
    <div>
      <Status disabledTabs={["coupon","closure"]}/>
    </div>
  )
}

export default InvestmentVehicleStatus
