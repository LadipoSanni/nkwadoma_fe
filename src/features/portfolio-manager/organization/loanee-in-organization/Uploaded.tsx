import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function Uploaded() {
  return (
    <div>
      <Loanees
        buttonName='Archive'
        tabType='All'
        condition= 'ARCHIVE'
      />
    </div>
  )
}

export default Uploaded
