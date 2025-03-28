import React from 'react'
import StatusReusable from './status-reusable-form'


function Operation() {
    const status = [ { value: "FUNDRAISING", label: "Fund raising" }, { value: "DEPLOYING", label: "Deploying" } ];
    const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
  
  return (
    <div>
     <StatusReusable
      selectStatus={status}
      selectState={state}
      isStateRequired={true}
      fundId=''
      statusType='Operation'
     /> 
    </div>
  )
}

export default Operation
