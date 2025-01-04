import React from 'react';
import Image from "next/image";

interface props {
    src: string;
    alt: string;
    id: string;
    size?: 'small' | 'big';

}

const OrganizationImage = ({src, alt, id, size}: props) => {
    return (
        <div
            className={` md:grid  md:place-items-center px-2 py-3 md:object-fit bg-[#F7F7F7] md:bg-[#F7F7F7] object-fit rounded-full  md:rounded-full ${size === 'big' ? ` md:w-[3.5rem] md:h-[3.5rem] w-[3rem] h-[3rem]` : `w-[2rem] h-[2rem]`}   `}>
            <Image
                id={id}
                data-testid={id}
                width={ 100}
                height={ 100 }
                style={{marginTop: 'auto', marginBottom: 'auto'}}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default OrganizationImage;