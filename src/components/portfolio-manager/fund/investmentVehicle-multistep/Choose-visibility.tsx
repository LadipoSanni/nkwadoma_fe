import React from 'react'

interface Props {
    onNext: () => void;
    onBack: () => void;
}

function ChooseVisibility({onBack,onNext}: Props) {
  return (
    <div className='flex gap-4'>
      bbb
      <button onClick={onBack}>back</button>
      <button onClick={onNext}>Continue</button>
    </div>
  )
}

export default ChooseVisibility
