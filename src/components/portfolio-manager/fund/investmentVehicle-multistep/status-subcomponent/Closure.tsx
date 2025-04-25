import React,{useState} from 'react'
import StatusReusable from './status-reusable-form'
// import {  useAppSelector } from '@/redux/store';
// import { resetStatusDefaultValue } from '@/redux/slice/vehicle/vehicle';
// import { store } from '@/redux/store';


function Closure() {
  const status = [ { value: "recollectionStatus", label: "Recollection" }, { value: "maturity", label: "Maturity" } ];
  const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
  const [currentStatus, setCurrentStatus] = useState("recollectionStatus");
  // const statusDefaultValue =  useAppSelector(state => (state?.vehicle?.statusDefaultValue))

  // useEffect(()=> {
  //            if(statusDefaultValue !== "closure"){
  //              store.dispatch(resetStatusDefaultValue())
  //            }
  //    })

  const handleStatusChange = (status: string) => {
    // console.log("Status changed to:", status);
    setCurrentStatus(status);
    // console.log("isStateRequired:", status === "MATURITY" ? false : true);
    // console.log("readonly:", status === "MATURITY" ? true : false);
  };
  
  return (
    <div>
       <StatusReusable
      selectStatus={status}
      selectState={state}
      onStatusChange={handleStatusChange}
      isStateRequired={currentStatus === "maturity"? false : true }
      readonly={currentStatus === "maturity"? true : false}
      initialStatus={currentStatus}
     /> 
    </div>
  )
}

export default Closure
