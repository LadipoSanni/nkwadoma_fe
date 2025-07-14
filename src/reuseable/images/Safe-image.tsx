
import Image from 'next/image';
import { useState } from 'react';

type SafeImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  id?: string,
  imageType?: string
   orgName?: string
};

const ALLOWED_DOMAINS = [
  'res.cloudinary.com', 
  'via.placeholder.com', 
  "images.unsplash.com", 
  "png.pngtree.com",
  'flagcdn.com',
  'upload.wikimedia.org'
];

export function SafeImage({ src, alt,priority,width,height,className,id,imageType,orgName, ...props }: SafeImageProps) {
  const [isError, setIsError] = useState(false);

  
  const isAllowedDomain = ALLOWED_DOMAINS.some(domain => 
    src.includes(domain)
  );

  if (imageType === "banner" && !isAllowedDomain || isError) {
    return <Image src={"/asset/Image/Banner.svg"} alt="Fallback logo"  height={134}
    width={351} id="bannerImage" {...props} />;
  } else if (imageType === "logo" && !isAllowedDomain || isError){
    return  <div className='flex justify-center items-center font-extrabold text-4xl'>{orgName}</div>
  }

  return (
    <Image
     id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      onError={() => setIsError(true)}
      className={className}
      {...props}
    />
  );
}