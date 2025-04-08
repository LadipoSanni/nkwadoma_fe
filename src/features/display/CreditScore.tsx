import React from 'react';
import {inter, inter700} from "@/app/fonts";

const CreditScore = () => {

    const style = [
        {
            // tag :'bad',
            // styles : {
                textColor: "#E80000",
                textBorderColor: "#F2BCBA",
                textBackgroundColor: "#FBE9E9",
            // }
        },
        {
            // tag : 'fair',
            // values : {
                textColor: "#776B08",
                textBorderColor: "#FBE2B7",
                textBackgroundColor: "#FEF6E8",
            // }
        },
        {
            // tag : 'good',
            // values : {
                textColor: "#0D9B48",
                textBorderColor: "#B4E5C8",
                textBackgroundColor: "#E7F7ED",
            // }
        },



    ]

    const good = {
        textColor: "#0D9B48",
        textBorderColor: "#B4E5C8",
        textBackgroundColor: "#E7F7ED",
    }

    const fair = {
        textColor: "#776B08",
        textBorderColor: "#FBE2B7",
        textBackgroundColor: "#FEF6E8",
    }

    const bad = {
        textColor: "#0D9B48",
        textBorderColor: "#B4E5C8",
        textBackgroundColor: "#E7F7ED",
    }

    const getCreditScoreStyle = (creditScore: number) => {
        // if (creditScore === 0) {
        //
        // }
        if (creditScore > 299 && creditScore <= 550) {
            // const {textBorderColor, textBackgroundColor, textColor} = good
            // return {textBorderColor, textBackgroundColor, textColor};
            return 'bad'
        }
        if (creditScore >= 650 && creditScore <= 750 ) {
            // const  {textBorderColor, textBackgroundColor, textColor} = fair
            // return {textBorderColor, textBackgroundColor, textColor}
            return 'fair'
        }
        if (creditScore >=  720 && creditScore <= 800) {
            // const {textBorderColor, textBackgroundColor, textColor} = bad
            // return {textBorderColor, textBackgroundColor, textColor};
            return 'good'
        }

    }

    const result = getCreditScoreStyle(300)
    // console.log('user style: ',
    //     textColor,
    //     textBackgroundColor,
    //     textBorderColor,)

    return (
        <div
            id={'CreditScoreComponent'}
            data-testid="CreditScoreComponent"
            className={` flex md:flex w-fit h-fit md:h-fit  md:w-fit gap-2 md:gap-2  `}
        >
            <p className={` ${inter.className} mt-auto mb-auto md:mt-auto md:mb-auto text-[14px] md:text-[14px] text-[#212221] md:text-#212221]  `}>very good </p>
            <div
                className={` w-fit md:w-fit md:h-fit h-fit md:py-1 py-1 md:px-1 px-1 md:rounded-md rounded-md border md:border  border-[${result === 'bad' ? '' }] md:border-[${userCreditScoreStyle?.textBorderColor}]`}>
                        <p
                            className={` ${inter700.className} md:bg-[${userCreditScoreStyle?.textBackgroundColor}] bg-[${userCreditScoreStyle?.textBackgroundColor}] md:px-1.5 px-1.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-[11px] text-[11px]  text-[${userCreditScoreStyle?.textColor}] md:text-[${userCreditScoreStyle?.textColor}] `}>500</p>
            </div>
        </div>
    );
};

export default CreditScore;