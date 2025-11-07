import React from 'react';
import Image from 'next/image';
import { getInitial } from '@/utils/GlobalMethods';

export interface BankAccount {
  bankName: string;
  logo?: string;
  accountNumber: string;
}

interface BankAccountItemProps {
  account: BankAccount;
  className?: string;
  showBorder?: boolean;
  logoSize?: string;
  showCheckmark?: boolean;
  isSelected?: boolean;
  style?: string;
  onSelect?: (account: BankAccount, isChecked: boolean) => void;
}

export const BankAccountItem: React.FC<BankAccountItemProps> = ({
  account,
  className = '',
  showBorder = false,
  logoSize = 'w-[27px] h-[27px]',
  showCheckmark = false,
  isSelected = false,
  style,
  onSelect
}) => {
  const initials = getInitial(account.bankName);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(account, event.target.checked);
  };

  return (
    <div className={`flex items-center gap-3 ${showBorder ? 'border-solid border-b border-[#D7D7D7] pb-3' : ''} ${className}`}>
      
      {showCheckmark && (
        <div className="mt-1 relative">
          <input
            data-testid="UniqueCheckAccount" 
            type="checkbox"
            id={`checkbox-${account.accountNumber}`}
            className={`
              border-[1px] rounded-sm w-[24px] h-[24px]
              appearance-none cursor-pointer
              relative
              ${isSelected 
                ? 'border-meedlBlue bg-[#E8EAEE]' 
                : 'border-[#98A2B3] bg-white'
              }
              transition-all duration-200
            `}
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
         
          {isSelected && (
  <div 
    className="absolute top-[12px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23142854'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}
  />
)}
        </div>
      )}
      
      <div className={`flex items-center gap-2 flex-1 `}>

        <div>
          {account.logo ? (
            <Image
              src={account.logo}
              alt={`${account.bankName} logo`}
              height={20}
              width={20}
              className={`${logoSize} rounded-full object-cover`}
              unoptimized={true}

            />
          ) : (
            <div className={`${logoSize} text-[12px] flex items-center justify-center rounded-full bg-[#F3F8FF]`}>
              {initials}
            </div>
          )}
        </div>

        <div className={`flex-1 ${style}`}>

          <p className='text-[#212221] font-medium text-[14px]'>{account.bankName}</p>
          <p className='text-[#4D4E4D] font-normal text-[12px]'>{account.accountNumber}</p>
        </div>
      </div>
    </div>
  );
};