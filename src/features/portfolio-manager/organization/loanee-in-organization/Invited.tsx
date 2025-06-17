import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function Invited() {
  return (
    <div>
      <Loanees
        tabType='Invited'
        uploadedStatus="INVITED"
      />
    </div>
  )
}

export default Invited