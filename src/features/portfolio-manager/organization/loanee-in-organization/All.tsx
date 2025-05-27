import React from 'react'
import Loanees from '@/components/portfolio-manager/organization/Loanees'

function All() {
  return (
    <div>
      <Loanees
        buttonName='Archive'
        tabType='All'
      />
    </div>
  )
}

export default All
