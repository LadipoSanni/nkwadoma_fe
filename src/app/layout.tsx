import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "@/app/provider";
import {Toaster} from "@/components/ui/toaster";
import {ToastProvider} from "@/components/ui/toast";
import {ConfigProvider} from "./config-context";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Meedl",
    description: "Meedl is addressing the financial barriers limiting access to economic opportunities by providing inclusive financing ",
};

async function getConfig() {
    return {
        uploadPreset: process.env.UPLOAD_PRESET,
        cloudName: process.env.CLOUD_NAME,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        countryCodeUrl: process.env.COUNTRY_CODE_URL
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const config = await getConfig();
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning={true}
        >
        <ToastProvider>
            <Toaster/>
            <Providers>
                <ConfigProvider config={config}>
                    {children}
                </ConfigProvider>
            </Providers>
        </ToastProvider>
        </body>
        </html>
    );
}
