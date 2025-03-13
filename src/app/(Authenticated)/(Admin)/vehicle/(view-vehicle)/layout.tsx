import React from 'react'
import { vehicleTab } from '@/types/tabDataTypes'
import TabSwitch from '@/layout/tabLayout'

type props = {
    children: React.ReactNode;
}

const ViewVehicleTabs: React.FC<props> = ({ children }) => {
  return (
    <div>
      <TabSwitch tabData={vehicleTab} defaultTab='/commercial-vehicle'>
     {children}
      </TabSwitch>
    </div>
  )
}

export default ViewVehicleTabs
