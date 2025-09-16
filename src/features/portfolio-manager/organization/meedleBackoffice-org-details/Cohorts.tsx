"use client"
import React,{useEffect} from 'react'
import { store } from '@/redux/store'
import { setOrganizationDetailTabStatus } from '@/redux/slice/organization/organization'

import CohortView from '@/features/cohort/cohort-view'

function Cohorts() {
    useEffect(() => {
        store.dispatch(setOrganizationDetailTabStatus("cohort"))
    },[])
    
  return (
    <div>
      <CohortView/>
    </div>
  )
}

export default Cohorts
