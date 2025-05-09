import React from 'react';
import {cabinetGrotesk, inter, inter500} from '@/app/fonts'
import {useRouter} from 'next/navigation';
import InvestmentCard from '@/reuseable/cards/Investment-card/InvestmentCard';
import {useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery} from '@/service/financier/marketplace';
import {store} from '@/redux/store';
import {setMarketInvestmentVehicleId} from '@/redux/slice/investors/MarketPlaceSlice';
import {setCurrentNavbarItem} from '@/redux/slice/layout/adminLayout';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";
import {MdOutlineAccountBalance} from 'react-icons/md';

type investmentVehicleType = {
    id: string;
    investmentVehicleType: string;
    name: string;
    rate: number;
    fundRaisingStatus?: string | null;
    deployingStatus?: string;
    couponDistributionStatus?: string;
    maturity?: string;
    recollectionStatus?: string;
};
const HandleCardDetails = (
    id: string,
    type: string,
    router: ReturnType<typeof useRouter>,
) => {
    store.dispatch(
        setMarketInvestmentVehicleId({
            marketInvestmentVehicleId: id,
            vehicleType: type,
        })
    );
    router.push('/marketplace/details');
};


const InvestmentMarketplace = () => {
    const router = useRouter();
    const { data, isLoading } = useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery({
        pageSize: 4,
        pageNumber: 0,
        investmentVehicleStatus: 'PUBLISHED',
    });

    const vehicles = data?.data?.body || [];

    const handleRoute = () => {
        router.push('/marketplace');
        store.dispatch(setCurrentNavbarItem('Marketplace'));
    };

    const getStatusColor = (status: string) => {
        if (status === 'CLOSE') {
            return 'bg-red-100 md:bg-red-100 md:text-red-600 text-red-600 border-[#F2BCBA] md:border-[#F2BCBA]';
        }
        return 'bg-green-100 md:bg-green-100 md:text-[#0D9B48] text-[#0D9B48] border-[#B4E5C8] md:border-[#B4E5C8]';
    };

    const getStatusBorderColor = (status: string) => {
        if (status === 'CLOSE') {
            return 'border-[#F2BCBA] md:border-[#F2BCBA]';
        }
        return 'border-[#B4E5C8] md:border-[#B4E5C8]';
    };

    const statusKeyAndValue = (vehicle: investmentVehicleType) => {
        if (vehicle.fundRaisingStatus) {
            return { key: 'Fundraising', value: vehicle.fundRaisingStatus };
        } else if (vehicle.deployingStatus) {
            return { key: 'Deploying', value: vehicle.deployingStatus };
        } else if (vehicle.couponDistributionStatus) {
            return { key: 'CouponDistribution', value: vehicle.couponDistributionStatus };
        } else if (vehicle.recollectionStatus) {
            return { key: 'Recollection', value: vehicle.recollectionStatus };
        } else if (vehicle.maturity) {
            return { key: 'Maturity', value: vehicle.maturity };
        } else {
            return { key: '', value: null };
        }
    };

    return (
        <section
            className={`${inter.className}`}
            id={'investmentMarketplaceSection'}
        >
            <div
                className={'flex justify-between items-center'}
                id={'investmentMarketplaceHeaderContainer'}
            >
                <h5
                    className={`${cabinetGrotesk.className} font-medium text-black500 md:text-[24px] text-[20px] leading-[150%]`}
                    id={'investmentMarketplaceTitle'}
                >
                    Investment Marketplace
                </h5>
                <p
                    onClick={handleRoute}
                    className={`${vehicles.length > 0 ? '' : 'hidden'} cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]`}
                    id={'investmentMarketplaceViewAll'}
                >
                    View all
                </p>
            </div>
            {isLoading ? (
                <div className="w-full flex justify-center items-center py-10">Loading...</div>
            ) : vehicles.length === 0 ? (
                <div id={'investmentMarketplaceEmptyState'}>
                    <GeneralEmptyState
                        name={'investment'}
                        icon={() => (
                            <MdOutlineAccountBalance
                                className={'h-8 w-8 text-meedlBlue'}
                                id={'investmentMarketplaceIcon'}
                            />
                        )}
                        message={<div className={'grid gap-2'}><h1
                            className={`${inter500.className} text-black500 text-[18px] leading-[150%]`}>All investments
                            will show here</h1> <p className={'text-lightBlue850 text-[14px] leading-[150%]'}>There are
                            no investments
                            available yet</p></div>}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {vehicles.slice(0, 4).map((vehicle) => {
                        const backgroundColor =
                            vehicle.investmentVehicleType === 'COMMERCIAL' ? '#D9EAFF' : '#E6F2EA';
                        const imageSrc =
                            vehicle.investmentVehicleType === 'COMMERCIAL' ? '/BlueCircles.svg' : '/GreenCircles.svg';
                        const { key: status, value: statusValue } = statusKeyAndValue(vehicle);
                        const statusClass = getStatusColor(statusValue ?? '');
                        const borderClass = getStatusBorderColor(statusValue ?? '');
                        const typeTextColor =
                            vehicle.investmentVehicleType === 'COMMERCIAL' ? 'text-[#142854]' : 'text-[#045620]';
                        const truncatedTitle =
                            vehicle.name.length > 20 ? vehicle.name.slice(0, 20) + '...' : vehicle.name;
                        const cardProps = {
                            id: vehicle.id,
                            backgroundColor,
                            investmentVehicleType: vehicle.investmentVehicleType,
                            imageSrc,
                            investmentVehicleName: truncatedTitle,
                            statusClass,
                            status: statusValue,
                            statuses: status,
                            borderClass,
                            percentage: vehicle.rate || 0,
                            typeTextColor,
                            HandleCardDetails: () => HandleCardDetails(vehicle.id, vehicle.investmentVehicleType, router),
                            statusValue: 'maturity',
                        };
                        return (
                            <div key={`wrapper-${vehicle.id}`}>
                                <InvestmentCard key={vehicle.id} {...cardProps} />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default InvestmentMarketplace;
