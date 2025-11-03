import React, { useState } from 'react'
import { LinkIcon } from '@/reuseable/svg-icons/Icons';
import { inter } from '@/app/fonts';
import { BankAccountItem } from '@/components/loanee/Bank-account-item';
import { bankAccounts } from '@/features/loaneeViews/payment/Payment';
import { BankAccount } from '@/components/loanee/Bank-account-item';
import { Button } from '../ui/button';
import styles from "@/features/loaneeViews/payment/index.module.css"
import {useToast} from "@/hooks/use-toast";

interface Props {
    setIsOpen?: (isOpen: boolean) => void
}

function AddAccount({ setIsOpen}:Props) {
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const {toast} = useToast();

  const handleAccountSelect = (account: BankAccount, isChecked: boolean) => {
    setSelectedAccounts(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(account.accountNumber);
      } else {
        newSet.delete(account.accountNumber);
      }
      return newSet;
    });
  };

 
  const selectedAccountsArray = Array.from(selectedAccounts);

   const handleSubmit = () => {
    toast({
        description: "Added successfully",
        status: "success",
        duration: 2000
    });  
    if(setIsOpen){
        setIsOpen(false)
    }
    console.log(selectedAccountsArray)
   }

  return (
    <div className={`${inter.className} w-full mb-7`}>
      <LinkIcon className="w-[60px] h-[60px] text-[#142854] transform scale-y-[1]" />
      <div className='mt-2'>
        <p className='text-[#212221] text-[20px] font-medium'>Add new account</p>
        <p className='text-[#4D4E4D] text-[14px] mt-1 '>
          Select one or more accounts to add
        </p>
      </div>
      
      <div className={`w-full mt-7 space-y-4 h-[30vh] ${styles.container}`}>
        {bankAccounts.map((account, index) => (
            <div key={index}>
             <BankAccountItem
            key={account.accountNumber}
            account={account}
            showCheckmark={true}
            isSelected={selectedAccounts.has(account.accountNumber)}
            onSelect={handleAccountSelect}
            className='pb-3'
          />
            </div>
        ))}
      </div>

      <div className='mt-6 flex items-center justify-end'>
        <Button
          className='bg-meedlBlue text-white w-[140px] h-[44px] rounded-lg disabled:bg-[#D7D7D7]'
          disabled={selectedAccounts.size === 0}
          onClick={handleSubmit}
          variant={"secondary"}
          id='addAccountId'
        >
          Add account
        </Button>
      </div>
    </div>
  )
}

export default AddAccount
