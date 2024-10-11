import { IBM_Plex_Sans, Inter} from 'next/font/google';
import localFont from "next/font/local";


export const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
});

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
});

export const cabinetGrotesk = localFont({
    src: "./fonts/CabinetGrotesk-Medium.woff",
    variable: "--font-cabinet-grotesk",
    weight: "100 900",
});

export const cabinetGroteskBold = localFont({
    src: "./fonts/CabinetGrotesk-Bold.woff",
    variable: "--font-cabinet-grotesk",
    weight: "700",
});

export const cabinetGroteskRegular = localFont({
    src: "./fonts/CabinetGrotesk-Regular.woff",
    variable: "--font-cabinet-grotesk",
    weight: "400",
});

