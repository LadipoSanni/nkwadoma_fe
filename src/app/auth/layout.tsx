import React from 'react';

type props = {
    children: React.ReactNode;
}

const Layout = ({children}: props) => {
    return (
        <main id={'auth-main-layout'} className={'grid place-content-center bg-[#EAEAEA] h-screen w-screen'}>
            {children}
        </main>
    );
};

export default Layout;