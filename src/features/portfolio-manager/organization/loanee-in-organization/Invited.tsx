import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function Invited() {
  return (
    <div>
      <Loanees
        tabType='Invited'
        // uploadedStatus="INVITED"
         uploadedStatus="INVITED"
         condition= 'ARCHIVE'
      />
    </div>
  )
}

export default Invited