import React from 'react'
import StatusReusable from './status-reusable-form'

function CouponDistribution() {
  const status = [ { value: "DEFAULT", label: "Defaulted" }, { value: "PERFORMING", label: "Performing" },{ value: "DUE", label: "Due" }, { value: "PAID", label: "Paid" } ];
  const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];

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
