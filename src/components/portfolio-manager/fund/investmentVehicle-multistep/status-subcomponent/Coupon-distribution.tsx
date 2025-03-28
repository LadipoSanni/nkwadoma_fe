import React from 'react'
import StatusReusable from './status-reusable-form'

function CouponDistribution() {
  const status = [ { value: "DEFAULTED", label: "Defaulted" }, { value: "PERFORMING", label: "Performing" },{ value: "DUE", label: "Due" }, { value: "PAID", label: "Paid" } ];
  const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];

  return (
    <div>
       <StatusReusable
      selectStatus={status}
      selectState={state}
      fundId=''
      statusType='Coupondistribution'
      readonly={true}
     /> 
    </div>
  )
}

export default CouponDistribution;
