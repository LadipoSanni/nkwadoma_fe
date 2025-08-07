'use client'
import React from 'react'
import Staff from '@/components/super-admin/staff/View-all-staff'
import ViewAllRequests from '@/components/super-admin/requests/View-all-requests'
import { useAppSelector} from '@/redux/store'

function Deactivated() {
  const name = useAppSelector(state => state?.staff?.sideTab)
  return (
    <div>
     { 
      name === "Staff"?<Staff status='Deactivated'/> : <ViewAllRequests/>
      }
    </div>
  )
}

export default Deactivated
