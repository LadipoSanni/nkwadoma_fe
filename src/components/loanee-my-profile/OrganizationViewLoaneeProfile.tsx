'use client'
import React, { useEffect } from 'react';
import Index from "@/pages/loanee/MyProfile/index";
import { store } from '@/redux/store';
import { setOrganizationFrom } from '@/redux/slice/layout/adminLayout';

const OrganizationViewLoaneeProfile = () => {

    useEffect(()=>{
        store.dispatch(setOrganizationFrom('cohort'))
    } ,[])

    return (

        <Index isViewingOrganizationLoaneeLoansThrowCohortFlow={true}/>
    );
};

export default OrganizationViewLoaneeProfile;