import React from 'react'
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';


interface Props {
    financierType: string
    handleCloseModal: () => void
    handleContinue: () => void
    setFieldValue: (field: string, value: string | number | boolean, shouldValidate?: boolean) => void;
    
}

function financierSelectType({financierType,handleCloseModal,handleContinue,setFieldValue}: Props) {
  return (
    <div>
         <div>
          <p className='mb-6 mt-6'>
          Select the type of financier you want to invite
          </p>
          <div className='gap-y-4 grid grid-cols-1 text-[14px]'>
          <div 
          className={`h-[61px] flex items-center border-[1px] rounded-xl cursor-pointer ${financierType === 'INDIVIDUAL' ? 'bg-[#F9F9F9]' : ''}`}
        onClick={() => setFieldValue('financierType', 'INDIVIDUAL')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="financierType"
                value="INDIVIDUAL"
                checked={financierType === 'INDIVIDUAL'}
                onChange={() => setFieldValue('financierType', 'INDIVIDUAL')}
                className="hidden" 
                id="individual" 
              />
              <span className="relative w-5 h-5 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {financierType === 'INDIVIDUAL' && (
                  <span className="absolute w-5 h-5 bg-meedlBlue rounded-full"></span>
                )}
                {financierType === 'INDIVIDUAL' && (
                  <svg
                    className="absolute w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-gray-700">Individual</span>
            </label>
          </div>
          <div className={`h-[61px] flex items-center border-[1px] rounded-xl cursor-pointer ${financierType === 'COOPERATE' ? 'bg-[#F9F9F9]' : ''}`} 
        onClick={() => setFieldValue('financierType', 'COOPERATE')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="financierType"
                value="COOPERATE"
                checked={financierType === 'COOPERATE'}
                onChange={() => setFieldValue('financierType', 'COOPERATE')}
                className="hidden" 
                id="Cooperate" 
              />
              <span className="relative w-5 h-5 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {financierType === 'COOPERATE' && (
                  <span className="absolute w-5 h-5 bg-meedlBlue  rounded-full"></span>
                )}
                {financierType === 'COOPERATE' && (
                  <svg
                    className="absolute w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-gray-700 ">Company</span>
            </label>
          </div>
          </div>
          <div className='mt-[32px]'>
          <SubmitAndCancelButton
           isValid={financierType? true : false}
           isLoading={false}
           handleCloseModal={handleCloseModal}
           hasContinue={true}
           handleContinueOrBack={handleContinue}
           id='financier'
          />
          </div>
            
        </div>
    </div>
  )
}

export default financierSelectType