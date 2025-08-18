"use client"
import React,{useEffect} from 'react'
import { store } from '@/redux/store'
import { setOrganizationDetailTabStatus } from '@/redux/slice/organization/organization'
import CohortView from '@/features/cohort/cohort-view'

function LoanBook() {
      useEffect(() => {
            store.dispatch(setOrganizationDetailTabStatus("loanBook"))
        },[])
        
  return (
    <div>
      <CohortView/>
    </div>
  )
}

export default LoanBook
