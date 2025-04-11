import React from 'react'
import StatusReusable from './status-reusable-form'


function Operation() {
    const status = [ { value: "fundRaising", label: "Fund raising" }, { value: "deployingStatus", label: "Deploying" } ];
    const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
  
  return (
    <div>
     <StatusReusable
      selectStatus={status}
      selectState={state}
      isStateRequired={true}
     /> 
    </div>
  )
}

export default Operation
