import { cabinetGroteskBold, inter, inter500 } from '@/app/fonts';
import React from 'react';

const InvestmentMandate = () => {
    return (
        <div className={`w-full md:w-full h-fit md:h-fit gap-4 md:gap-8 px-8 py-8 border border-[#D7D7D7] md:border md:border-[#D7D7D7] bg-[#F9F9F9] md:bg-[#F9F9F9] rounded md:rounded-md `}>
            <p className={` ${cabinetGroteskBold.className} text-[32px] md:text-[32px] text-[#212221] md:text-[#212221]  `}>Meedl Village Limited Privacy Policy</p>
            <div className={`text-[14px] md:text-[14px] grid gap-8 ${inter.className}`}>
                <div >                Meedl Village Limited (“<span className={` ${inter500.className}`}>we</span>” or “<span className={` ${inter500.className}`}>our</span>” or “<span className={` ${inter500.className}`}>use</span>”) is committed to protecting your privacy and ensuring compliance with applicable data protection laws and regulations. This Privacy Policy outlines how we collect, use, and safeguard your information when you use the Meedl platform (“<span className={` ${inter500.className}`}>Platform</span>”), including compliance with the Nigerian Data Protection Act (NDPA), Nigeria Data Protection Regulation (NDPR), and relevant provisions of the 1999 Constitution of the Federal Republic of Nigeria (as amended).
                </div>
                <p className={` ${inter.className}`}>By accessing or using the Platform, you agree to the practices described in this Privacy Policy.</p>
            </div>
            <div className={`grid md:grid gap-8 md:gap-8 `}>
                <div className={`mt-4 md:mt-4 grid md:grid gap-4 md:gap-8 `}>
                    <div>
                        <p className={`${cabinetGroteskBold.className} text-[24px] md:text-[24px] text-[#212221] md:text-[#212221]  `}>1. Information we collect</p>
                        <p className={` ${inter.className} text-[14px] md:text-[14px] `}>We collect the following types of information to provide and improve our services:</p>
                    </div>
                    <div className={`grid md:grid gap-4 md:gap-4`}>
                        <p className={` ${inter500.className} text-[#212221] md:text-[#212221] text-[16px] md:text-[16px] `}>1.1 Information provided by institutions</p>
                        <ul className={`${inter.className} text-[14px] md:text-[14px] md:pl-5 grid gap-4  pl-5 `}>
                            <li className={`list-disc`}>Institution details: Name, Address, Email address, and contact information.</li>
                            <li className={`list-disc`}> Student information submitted for loan referrals, including name, program details, academic status, and related data.</li>
                        </ul>
                    </div>

                    <div className={`grid md:grid gap-4 md:gap-4`}>
                        <p className={` ${inter500.className} text-[#212221] md:text-[#212221] text-[16px] md:text-[16px] `}>1.2 Information provided by students</p>
                        <ul className={`${inter.className} text-[14px] md:text-[14px] md:pl-5 grid gap-4  pl-5 `}>
                            <li className={`list-disc`}>Personal identification data: Name, date of birth, BVN (Bank Verification Number), NIN (National Identification Number), and Face ID.
                            </li>
                            <li className={`list-disc`}>Contact details: Email address, phone number, and next of kin information.</li>
                            <li className={`list-disc`}>Employment status and related details for loan disbursement and recovery.</li>
                        </ul>
                    </div>

                    <div className={`grid md:grid gap-4 md:gap-4`}>
                        <p className={` ${inter500.className} text-[#212221] md:text-[#212221] text-[16px] md:text-[16px] `}>1.3 Automatically collected information</p>
                        <ul className={`${inter.className} text-[14px] md:text-[14px] md:pl-5 grid gap-4  pl-5 `}>
                            <li className={`list-disc`}>Log data: IP address, browser type, device information, and usage data.</li>
                            <li className={`list-disc`}>Cookies: Small files stored on your device to enhance user experience.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentMandate;