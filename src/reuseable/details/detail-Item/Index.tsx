import React from 'react';

interface DetailItemProps {
    label: string;
    value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className={'md:flex md:justify-between grid gap-3'}>
        <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>{label}</h3>
        <p className={`text-black500 text-[14px] leading-[150%]`}>{value}</p>
    </div>
);

export default DetailItem;