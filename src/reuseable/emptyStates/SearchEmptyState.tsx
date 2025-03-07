import React, { ElementType } from 'react'
// import {capitalizeFirstLetters} from "@/utils/GlobalMethods";

type Props = {
    name: string
    icon?: ElementType,
    className?:string ,

}

function SearchEmptyState({name,icon: Icon,className}: Props) {
    // const lowercaseName = name?.charAt(0).toLowerCase()
    // const remainingPart = name?.slice(1);
    // const title = `${lowercaseName}${remainingPart}`;

    return (
        <div className={`px-4 md:mt-36 mt-28 ${className}`}>
            <div className='flex justify-center text-center' >
                <div>
                    <div className='flex justify-center text-center' >
                        {Icon &&
                            <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 w-[70px] h-[70px] flex justify-center items-center rounded-full mb-6'>
                                <Icon style={{fontSize:"2.0rem",color:"#142854"}}/>
                            </div>
                        }
                    </div>
                    <h1 id='titleId' className={` mb-2 `}><span className={`capitalize`}/>{name}<span/> not found</h1>
                </div>
            </div>
        </div>
    )
}

export default SearchEmptyState