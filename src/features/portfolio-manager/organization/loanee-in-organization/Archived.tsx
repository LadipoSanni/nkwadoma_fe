import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function Archived() {
  return (
    <div>
       <Loanees
       buttonName='Unarchived'
       tabType='Archived'
       status='ARCHIVE'
       condition= 'UNARCHIVE'
     />
    </div>
  )
}

export default Archived
