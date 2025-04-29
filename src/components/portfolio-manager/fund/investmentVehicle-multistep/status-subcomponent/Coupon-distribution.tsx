import React from 'react'
import StatusReusable from './status-reusable-form'
// import {  useAppSelector } from '@/redux/store';
// import { resetStatusDefaultValue } from '@/redux/slice/vehicle/vehicle';
// import { store } from '@/redux/store';

function CouponDistribution() {
  const status = [ { value: "DEFAULT", label: "Defaulted" }, { value: "PERFORMING", label: "Performing" },{ value: "DUE", label: "Due" }, { value: "PAID", label: "Paid" } ];
  const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
  // const statusDefaultValue =  useAppSelector(state => (state?.vehicle?.statusDefaultValue))

  //   useEffect(()=> {
  //          if(statusDefaultValue !== "coupon"){
  //            store.dispatch(resetStatusDefaultValue())
  //          }
  //      })
     

  return (
    <div>
       <StatusReusable
      selectStatus={status}
      selectState={state}
      readonly={true}
     /> 
    </div>
  )
}

export default CouponDistribution;
