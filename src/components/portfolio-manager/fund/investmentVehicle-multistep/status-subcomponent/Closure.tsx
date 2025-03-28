import React,{useState} from 'react'
import StatusReusable from './status-reusable-form'

function Closure() {
  const status = [ { value: "RECOLLECTION", label: "Recollection" }, { value: "MATURITY", label: "Maturity" } ];
  const state = [ { value: "OPEN", label: "Open" }, { value: "CLOSE", label: "Close" } ];
    const [currentStatus, setCurrentStatus] = useState("RECOLLECTION");

  const handleStatusChange = (status: string) => {
    console.log("Status changed to:", status);
    setCurrentStatus(status);
    console.log("isStateRequired:", status === "MATURITY" ? false : true);
    console.log("readonly:", status === "MATURITY" ? true : false);
  };
  
  return (
    <div>
       <StatusReusable
      selectStatus={status}
      selectState={state}
      fundId=''
      statusType='Operation'
      onStatusChange={handleStatusChange}
      isStateRequired={currentStatus === "MATURITY"? false : true }
      readonly={currentStatus === "MATURITY"? true : false}
      initialStatus={currentStatus}
     /> 
    </div>
  )
}

export default Closure
