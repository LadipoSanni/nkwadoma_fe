import React from 'react';
import {cabinetGrotesk, inter, inter500} from '@/app/fonts'
import {Icon} from "@iconify/react";
import {useRouter} from 'next/navigation';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";
import { useViewFinancierDashboardQuery } from '@/service/financier/api';
import Card from "@/pages/financier/my-investment/card";
import { InvestedVehicleDetails} from "@/types/Component.type";
import { store } from "@/redux/store";
import { setCurrentMyInvestmentVehicleDetails } from "@/redux/slice/financier/financier";

const MyInvestments = () => {
    const router = useRouter();
    const { data } = useViewFinancierDashboardQuery({});
    const investmentVehicles = data?.data?.investmentVehicles || [];

    const handleRoute = () => {
        router.push('/my-investment')
    }

    const HandleCardDetails = (vehicleDetails: InvestedVehicleDetails) => {
        store.dispatch(
            setCurrentMyInvestmentVehicleDetails(vehicleDetails)
        );
        router.push("/my-investment/details");
    };

    const getStatusColor = (status: string) => {
        if(status === 'CLOSE') {
            return 'bg-red-100 md:bg-red-100 md:text-red-600 text-red-600 border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'bg-green-100 md:bg-green-100 md:text-[#0D9B48] text-[#0D9B48] border-[#B4E5C8] md:border-[#B4E5C8]'
    }

    const getStatusBorderColor = (status: string) => {
        if(status === 'CLOSE') {
            return 'border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'border-[#B4E5C8] md:border-[#B4E5C8]'
    }

    return (
        <section
            className={`${inter.className}`}
            id="myInvestmentsSection"
        >
            <div
                className={'flex justify-between items-center'}
                id="myInvestmentsHeaderContainer"
            >
                <h5
                    className={`${cabinetGrotesk.className} font-medium text-black500 md:text-[24px] text-[20px] leading-[150%]`}
                    id="myInvestmentsTitle"
                >
                    My investments
                </h5>
                <p
                    onClick={handleRoute}
                    className={`${investmentVehicles.length > 0 ? '' : 'hidden'} cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]`}
                    id="myInvestmentsViewAll"
                >
                    View all
                </p>
            </div>
            {investmentVehicles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {investmentVehicles.slice(0, 4).map((vehicle: InvestedVehicleDetails, index: number) => {
                        const backgroundColor =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/BlueCircles.svg"
                                : "/GreenCircles.svg";
                        const statusValue = vehicle.fundRaisingStatus ? vehicle.fundRaisingStatus : vehicle.deployingStatus;
                        const status = vehicle.fundRaisingStatus !== null ? 'Fundraising' : 'Deploying';

                        const statusClass = getStatusColor(statusValue)
                        const borderClass = getStatusBorderColor(statusValue)

                        const truncatedTitle =
                            vehicle.name.length > 20
                                ? vehicle.name.slice(0, 20) + "..."
                                : vehicle.name;

                        return <Card
                            key={`wrapper-${index}`}
                            HandleCardDetails={HandleCardDetails}
                            vehicleDetails={vehicle}
                            backgroundColor={backgroundColor}
                            investmentVehicleType={vehicle.investmentVehicleType}
                            imageSrc={imageSrc}
                            investmentVehicleName={truncatedTitle}
                            statusClass={statusClass}
                            status={status}
                            statusValue={statusValue}
                            borderClass={borderClass}
                            percentage={vehicle.interestRateOffered || 0}
                        />;
                    })}
                </div>
            ) : (
                <div id="myInvestmentsEmptyState">
                    <GeneralEmptyState
                        name={'investment'}
                        icon={() => (
                            <Icon
                                icon='iconoir:hand-cash'
                                color={'#142854'}
                                height={"40px"}
                                width={"40px"}
                                id="myInvestmentsIcon"
                            />
                        )}
                        message={<div className={'grid gap-2'}><h1
                            className={`text-black500 ${inter500.className} text-[18px] leading-[150%]`}>My investments will
                            show here</h1> <p className={'text-lightBlue850 text-[14px] leading-[150%]'}>There are no
                            investments
                            available yet</p></div>}
                    />
                </div>
            )}
        </section>
    );
};

export default MyInvestments;
