import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function Archived() {
  return (
    <div>
       <Loanees
       buttonName='Unarchived'
       tabType='Archived'
     />
    </div>
  )
}

export default Archived
