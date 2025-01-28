import React, { ElementType } from 'react'

type Props = {
    icon?: ElementType,
    className?:string ,

}

function SearchEmptyState({icon: Icon,className}: Props) {
    // const lowercaseName = name?.charAt(0).toLowerCase()
    // const remainingPart = name?.slice(1);
    // const title = `${lowercaseName}${remainingPart}`;

    return (
        <div className={`px-4 md:mt-36 mt-28 ${className}`}>
            <div className='flex justify-center text-center' >
                <div>
                    <div className='flex justify-center text-center' >
                        {Icon &&
                            <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 w-20 h-20 flex justify-center items-center rounded-full mb-6'>
                                <Icon style={{fontSize:"2.0rem",color:"#142854"}}/>
                            </div>
                        }
                    </div>
                    <h1 id='titleId' className={`font-semibold mb-2 `}>Organization not found</h1>
                </div>
            </div>
        </div>
    )
}

export default SearchEmptyState