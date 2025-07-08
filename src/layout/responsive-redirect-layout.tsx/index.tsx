"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ResponsiveRedirectProps {
    children: ReactNode;
    mobilePath: string;
    webPath: string;
}

function ResponsiveRedirect({ children, mobilePath, webPath }: ResponsiveRedirectProps) {
    const router = useRouter();
    const pathname = usePathname(); 
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 959px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = () => {
            const isCurrentlyMobile = mediaQuery.matches;
            setIsMobile(isCurrentlyMobile);
            if (!isCurrentlyMobile && pathname !== webPath) {
                router.replace(webPath);
            } else if (isCurrentlyMobile && pathname !== mobilePath) {
                router.replace(mobilePath);
            }
        };

        mediaQuery.addEventListener('change', handleResize);
        if (!mediaQuery.matches && pathname !== webPath) {
            router.replace(webPath);
        } else if (mediaQuery.matches && pathname !== mobilePath) {
            router.replace(mobilePath);
        }

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, [router, webPath, mobilePath, pathname]);

    if (!isMobile) {
        return null; 
    }

    return <div className="md:hidden">{children}</div>;
}

export default ResponsiveRedirect

// "use client";
// import React, { ReactNode, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface ResponsiveRedirectProps {
//     children: ReactNode;
//     webPath: string; 
// }

// function ResponsiveRedirect({ children, webPath }: ResponsiveRedirectProps) {
//     const router = useRouter();
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const mediaQuery = window.matchMedia('(max-width: 767px)');
//         setIsMobile(mediaQuery.matches);

//         const handleResize = () => {
//             const isCurrentlyMobile = mediaQuery.matches;
//             setIsMobile(isCurrentlyMobile);
//             if (!isCurrentlyMobile) {
//                 router.replace(webPath);
//             }
//         };

//         mediaQuery.addEventListener('change', handleResize);
//         if (!mediaQuery.matches) {
//             router.replace(webPath);
//         }

//         return () => mediaQuery.removeEventListener('change', handleResize);
//     }, [router, webPath]);

//     if (!isMobile) {
//         return null; 
//     }

//     return <div className="md:hidden">{children}</div>;
// }

// export default ResponsiveRedirect