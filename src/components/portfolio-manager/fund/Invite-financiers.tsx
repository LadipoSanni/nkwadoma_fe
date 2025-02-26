import React from 'react'


// interface ApiError {
//   status: number;
//   data: {
//     message: string;
//   };
// }

// const initialFormValue = {
//   name: "",
  
// };

interface Props{
  setIsOpen?: (e: boolean) => void;
  organizationId?: string
}

function InviteFinanciers({setIsOpen}: Props) {

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
      
    }
  };

  return (
    <div onClick={handleCloseModal}>InviteFinanciers</div>
  )
}

export default InviteFinanciers