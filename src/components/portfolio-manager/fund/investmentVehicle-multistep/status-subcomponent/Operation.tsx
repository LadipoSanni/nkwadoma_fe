import React from 'react'
import StatusReusable from './status-reusable-form'
// import {  useAppSelector } from '@/redux/store';
// import { resetStatusDefaultValue } from '@/redux/slice/vehicle/vehicle';
// import { store } from '@/redux/store';

function Operation() {
    const status = [ { value: "fundRaising", label: "Fund raising" }, { value: "deployingStatus", label: "Deploying" } ];
    const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
    // const statusDefaultValue =  useAppSelector(state => (state?.vehicle?.statusDefaultValue))
    
    // useEffect(()=> {
    //     if(statusDefaultValue !== "operation"){
    //       store.dispatch(resetStatusDefaultValue())
    //     }
    // })
  
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
