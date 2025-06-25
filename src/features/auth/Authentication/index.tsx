'use client'
import React from 'react';
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import { redirect } from 'next/navigation';


interface AuthProps {
children: React.ReactNode;
}
const Index : React.FC<AuthProps> = ({children}) => {
    const token = getUserDetailsFromStorage('access_token' )


    return token ? (
        <div>
            {children}
        </div>
    ):
        (
            redirect('/auth/login')
        );
};

export default Index;