"use client"
import React from 'react';
// import {Avatar} from "@mui/material";
import styles from "./SelectedLoan.module.css"
import OrganizationImage from "@/reuseable/profile/Organization-image";

const OrganizationNameAndChangeButton = () => {

    const [openInstitutionModal, setOpenInstitutionModal] = React.useState(false)
 
    const  handleOpenInstitutionModal = () => {
        setOpenInstitutionModal(true) 
        
    }
    

    return (
        <div
            data-testid="OrganizationNameAndChangeButtonContainer"
            id="organizationAndChangeButton"
            className={`flex w-[100%] bg-purple-50 gap-3`}>
            <div className={`grid mt-auto mb-auto`}>
                <OrganizationImage src={''} alt={''} id={'oranizationImageOnLoan'}/>
                {/*<Avatar data-testid="OrganizationImage" id="OrganizationAvatar" src={'/OrganizationLogo.svg'} variant="square" sx={{width: 24, height: 24}}/>*/}
            </div>
            <div data-testid="organizationNameContainer" id="organizationNameContainer" className={` `}>
                <div id="instituteName" style={{marginTop: 'auto'}} className={` ${styles.organizationName}`}
                >School of Product, Yaba
                </div>
            </div>
            <div id="changeOrganizationText" className={` text-blue-300 underline`}>Change</div>

            {openInstitutionModal &&
                <div id="changeOranizationDIV" className={`grid mt-[auto] mb-auto`} onClick={() => {
                    handleOpenInstitutionModal()
                }}>
                    <div id="changeOrganizationText" className={` text-meedlBlue bg-blue-500 underline`}>Change</div>
                </div>

            }

        </div>
    );
};

export default OrganizationNameAndChangeButton;