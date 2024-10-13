"use client"
import React from 'react';
import {Avatar} from "@mui/material";
import styles from "./SelectedLoan.module.css"

const OrganizationNameAndChangeButton = () => {

    const [openInstitutionModal, setOpenInstitutionModal] = React.useState(false)
 
    const  handleOpenInstitutionModal = () => {
        setOpenInstitutionModal(true) 
        
    }
    

    return (
        <div
            data-testid="OrganizationNameAndChangeButtonContainer"
            id="organizationAndChangeButton"
            className={`flex gap-3`}>
            <div className={`grid mt-auto mb-auto`}>
                <Avatar data-testid="OrganizationImage" id="OrganizationAvatar" src={'/OrganizationLogo.svg'} variant="square" sx={{width: 24, height: 24}}/>
            </div>
            <div data-testid="organizationNameContainer" id="organizationNameContainer" className={` mt-[auto] mb-[auto]`}>
                    <div id="instituteName" style={{marginTop: 'auto'}} className={` ${styles.organizationName}`}
                    >School of Product, Yaba</div>
            </div>
            { openInstitutionModal &&  <div id="changeOranizationDIV" className={`grid mt-[auto] mb-auto`} onClick={() => {
                handleOpenInstitutionModal()
            }}>
                <span id="changeOrganizationText" className={`${styles.changeOrganizationText}`}>Change</span>
                <hr id="changeOrganizationLine" className={`${styles.changeOrganizationLine}`}/>
            </div>
       
            }
           
        </div>
    );
};

export default OrganizationNameAndChangeButton;