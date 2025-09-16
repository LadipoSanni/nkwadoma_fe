import React from 'react'
import Image from 'next/image'
import { SafeImage } from '@/reuseable/images/Safe-image';
import { Button } from '@/components/ui/button';
import { cabinetGrotesk} from '@/app/fonts'

interface Props {
  imageBanner?: string;
  imageLogo?: string;
  fullName?: string;
  buttonName?: string;
  handleOpenModal: () => void
}

function InfoImageBanner({imageBanner,imageLogo,buttonName,handleOpenModal,fullName}:Props) {
   const firstCharInName = fullName?.charAt(0).toUpperCase()
  return (
    <div>
      <section id='firstSection'>
      {imageBanner? 
     <SafeImage
     alt="banner"
     height={134}
     width={351}
     priority={true}
     imageType="banner"
     src={imageBanner}
    />  :  <Image
    id="bannerImage"
    src="/asset/Image/Banner.svg"
    alt="banner"
    height={134}
    width={351}
    />}
  
    <div
     id="logoContainer"
     className={
       "flex items-center justify-center absolute top-[150px] left-[55px] w-[140px] h-[140px] bg-greyBase200 rounded-full border-[10px] border-meedlWhite"
     }
    >
    { imageLogo? 
    <SafeImage
      id="bannerLogo"
      alt={"logo"}
      height={70}
      width={70}
      priority={true}
      imageType="logo"
      orgName={firstCharInName}
      src={imageLogo}
      />  : <div className="flex justify-center items-center font-extrabold text-4xl">{firstCharInName}</div>}
    </div>
      </section>
      <section className='mt-24 text-[28px] font-medium'>
        <p className={` ${cabinetGrotesk.className}`}>{fullName}</p>
         <div className='mt-8'>
          <Button
          id='activateAndDeactiveButton'
          variant={'outline'}
          className="w-full   md:w-[25vw]  h-[45px] text-[#142854] font-semibold border-solid border-[#142854]"
          onClick={handleOpenModal}
          >
            {buttonName}
          </Button>
         </div>
      </section>
    </div>
  )
}

export default InfoImageBanner
