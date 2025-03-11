"use client";
import React,{useState} from 'react'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
import {inter} from '@/app/fonts'
import Draft from "@/features/portfolio-manager/fund/draft/Index";
import CreateInvestmentVehicle from '@/components/portfolio-manager/fund/Create-investment-vehicle';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";

function EndownmentFund() {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
    };

    const handleCommercialFundDraftClick = () => {
        setModalType("draft")
        setIsModalOpen(true);
    }

    const handleCreateInvestmentVehicleClick = () => {
        setModalType("createEndownmentVehicle")
        setIsModalOpen(true);
    }

  return (
    <div className={`py-5 ${inter.className}`}>
      <div>
      <InvestmentActionBar
                    id='endowmentFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleCommercialFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
                    buttonName='Set up endownment fund'
                />
      </div>
       <div>
        <TableModal
          isOpen={isModalOpen}
                    closeModal={()=> setIsModalOpen(false)}
                    className='pb-1'
                    headerTitle={modalType === "createEndownmentVehicle"? "Create Investment Vehicle" : "Draft" }
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    width={"38%"}
        >
            {modalType === "createEndownmentVehicle"? (<CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='donor' investmentVehicleType='ENDOWMENT' />): (  <Draft setIsOpen={() => setIsModalOpen(false)} type='donor' investmentVehicleType='ENDOWMENT'/>)}

        </TableModal>
       </div>
    </div>
  )
}

export default EndownmentFund

