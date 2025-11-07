import { IBM_Plex_Sans, Inter,Hanken_Grotesk } from 'next/font/google';
import localFont from "next/font/local";


export const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
    preload: false

});

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
    preload: false

});


export const inter700 = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '700',
    preload: false

});

export const inter500 = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '500',
    preload: false

});
export const inter600 = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '600',
    preload: false

});
export const cabinetGrotesk = localFont({
    src: "./fonts/CabinetGrotesk-Medium.woff",
    variable: "--font-cabinet-grotesk",
    weight: "100 900",
    preload: false

});

export const cabinetGroteskBold = localFont({
    src: "./fonts/CabinetGrotesk-Bold.woff",
    variable: "--font-cabinet-grotesk",
    weight: "700",
    preload: false

});

export const cabinetGroteskBold650 = localFont({
    src: "./fonts/CabinetGrotesk-Bold.woff",
    variable: "--font-cabinet-grotesk",
    weight: "620",
    preload: false

});
export const cabinetGroteskRegular = localFont({
    src: "./fonts/CabinetGrotesk-Regular.woff",
    variable: "--font-cabinet-grotesk",
    weight: "400",
    preload: false
});
export const cabinetGroteskMediumBold = localFont({
    src: "./fonts/CabinetGrotesk-Regular.woff",
    variable: "--font-cabinet-grotesk",
    weight: "500",
    preload: false
});

export const cabinetGroteskMediumBold600 = localFont({
    src: "./fonts/CabinetGrotesk-Regular.woff",
    variable: "--font-cabinet-grotesk",
    weight: "600",
    preload: false
});

export const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
    preload: false
<<<<<<< HEAD
});
=======
});

>>>>>>> a4eb6cd56d22d59f636603f40c63339e822bc9aa
