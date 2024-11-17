import React from 'react';
import Image from "next/image";

interface props {
    src: string;
    alt: string;
    id: string;

}

const OrganizationImage = ({src, alt, id}: props) => {
    return (
        <div
            className={` md:grid  md:place-items-center px-2 py-3 md:object-fit bg-[#F7F7F7] md:bg-[#F7F7F7] object-fit rounded-full  md:rounded-full w-[3rem] h-[3rem]  md:w-[2.5rem] md:h-[2.5rem] `}>
            <Image
                id={id}
                data-testid={id}
                width={100}
                height={100}
                style={{marginTop: 'auto', marginBottom: 'auto'}}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default OrganizationImage;