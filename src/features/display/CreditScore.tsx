import React from 'react';
import {inter, inter700} from "@/app/fonts";

interface Props {
    creditScore: number;
    creditScoreDescriptionId?: string;
}

const CreditScore = ({creditScore, creditScoreDescriptionId}: Props) => {

    const style = [
        {textColor: "#E80000", textBorderColor: "#F2BCBA", textBackgroundColor: "#FBE9E9",},
        {textColor: "#776B08", textBorderColor: "#FBE2B7", textBackgroundColor: "#FEF6E8",},
        {textColor: "#0D9B48", textBorderColor: "#B4E5C8", textBackgroundColor: "#E7F7ED",},
        {textColor: "#212221", textBorderColor: "#e5e8ec", textBackgroundColor: "#f6f6f6",},
    ]



    const getCreditScoreStyle = (creditScore: number) => {
        if (creditScore === 0) {
            return style.at(3)
        }
        if (creditScore >= 1 && creditScore <= 649) {
            return style.at(0)
        }
        if (creditScore >= 650 && creditScore <= 699 ) {
            return style.at(1)

        }
        if (creditScore >=  700 && creditScore <= 800) {
            return style.at(2)

        }

    }

    const getCreditScoreDescription = (creditScore: number) => {
        if (creditScore === 0) {
            return 'unscored'
        }
        if (creditScore > 0 &&   creditScore <= 549) {
            return 'Very poor'
        }
        if (creditScore >= 550 && creditScore <= 649 ) {
            return 'Poor'

        }
        if (creditScore >=  650 && creditScore <= 699) {
            return 'Fair'

        }
        if (creditScore > 700 && creditScore <= 749) {
            return 'Good'
        }
        if (creditScore >= 750 && creditScore <= 800 ) {
            return 'Excellent'

        }

    }

    const description = getCreditScoreDescription(creditScore)

    const result = getCreditScoreStyle(creditScore)



    return (
        <div
            id={'CreditScoreComponent'}
            data-testid="CreditScoreComponent"
            className={` flex md:flex w-fit h-fit md:h-fit  md:w-fit gap-2 md:gap-2  `}
        >
            <p id={'creditScoreDescription'} data-testid={creditScoreDescriptionId ? creditScoreDescriptionId :'creditScoreDescription'} className={` ${inter.className} mt-auto mb-auto md:mt-auto md:mb-auto text-[14px] md:text-[14px] text-[#212221] md:text-#212221]  `}>{description}</p>
            <div

                className={` w-fit md:w-fit md:h-fit h-fit md:py-1 py-1 md:px-1 px-1 md:rounded-md rounded-md border md:border  `}
                style={{border: `${result?.textBorderColor}`, borderWidth: `${creditScore === 0 ? '1px' : '0.1rem'}`, borderStyle: 'solid'}}
            >
                        <p
                            id={'creditScore'}
                            data-testid={'creditScore'}
                            className={` ${inter700.className} md:px-1.5 px-1.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-[11px] text-[11px]  `}
                            style={{backgroundColor: `${result?.textBackgroundColor}`, color: `${result?.textColor}`}}
                        >{creditScore}</p>
            </div>
        </div>
    );
};

export default CreditScore;