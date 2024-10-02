import React from 'react';

type props = {
    children: React.ReactNode;
}

const Layout = ({children}: props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;