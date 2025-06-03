import React from 'react'
import { inter } from '@/app/fonts';
import { MdOutlineFileDownload } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface Props {
    name? : string
    fileUrl: string 
    fileName: string
}

function DownloadTemplate({name,fileUrl,fileName}: Props) {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

  return (
    <div className={`py-3 border-solid border-[1px] border-[#D7D7D7] px-4 rounded-md  text-[14px] ${inter.className} relative`}>
      <h1 className='font-semibold'>Download {name} data template</h1>
     <div className='flex gap-9  mt-3'>
      <p className='text-[#6A6B6A]'>This template include columns necessary to import {name}s</p>
      <div className='relative  bottom-1'>
      <Button
      className='border-none shadow-none text-[#142854] '
      variant={'outline'}
      onClick={handleDownload}
      >
        <MdOutlineFileDownload className='w-10 h-5'/>
        <span className='font-extrabold'>Download</span>
      </Button>
      </div>
     
     </div>
    </div>
  )
}

export default DownloadTemplate
