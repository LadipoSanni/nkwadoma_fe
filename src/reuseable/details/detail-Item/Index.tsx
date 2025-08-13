import React, { ReactNode } from 'react';

interface DetailItemProps {
    label: string;
    value: string | ReactNode;
    id?:string,
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, id }) => (
    <div id={id ? id : `label` + label?.at(0) } data-testid={id ? id : `label` + label?.at(0) } className={'md:flex md:justify-between grid gap-3'}>
        <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>{label}</h3>
        <p className={`text-black500 text-[14px] leading-[150%]`}>{value}</p>
    </div>
);

export default DetailItem;