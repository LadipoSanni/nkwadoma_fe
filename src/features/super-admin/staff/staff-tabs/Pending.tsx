'use client'
import React from 'react'
import Staff from '@/components/super-admin/staff/View-all-staff'
import { useAppSelector} from '@/redux/store'
import ViewAllRequests from '@/components/super-admin/requests/View-all-requests'

function Pending() {
  const name = useAppSelector(state => state?.staff?.sideTab)

  return (
    <div>
     { name === "Staff"? <Staff status='Pending'/> :  <ViewAllRequests/>}
    </div>
  )
}

export default Pending
