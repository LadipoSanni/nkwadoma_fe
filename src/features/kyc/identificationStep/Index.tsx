'use client'
import React from 'react';
import {inter500, inter} from '@/app/fonts'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input"
import {Button} from  "@/components/ui/button"
import {useRouter} from 'next/navigation'
import {store} from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/kyc-multiselect';


const IdentificationStep = () => {
    const route = useRouter()
    const handleOnClick = () => {
        store.dispatch(markStepCompleted("identification"))
        route.push('/kyc/sof')
    }
    return (
        <main className={`${inter.className} xl:px-36  grid-cols-1 gap-y-6  grid gap-10`}>
            <div className={`${inter500.className} grid gap-1`}>
                <h1 className={`text-meedlBlack text-[18px] leading-[150%] font-medium`}>Identification</h1>
                <p className={`text-black400 text-[14px] leading-[150%] font-normal`}>Add
                    identification details</p>
            </div>

            <form action="" className={'grid gap-5'}>
                <div className={'grid gap-2 '}>
                    <Label htmlFor="bvn" className=" block text-sm font-medium text-labelBlue">National identification number</Label>
                    <Input
                        type="number"
                        id="bvn"
                        placeholder="Enter BVN"
                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                    />
                </div>
                <div className={'grid gap-2'}>
                    <Label htmlFor="bvn" className=" block text-sm font-medium text-labelBlue">Bank
                        verification number</Label>
                    <Input
                        type="number"
                        id="bvn"
                        placeholder="Enter BVN"
                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                    />
                </div>
                <div className={'flex justify-end mt-5'}>
                <Button onClick={handleOnClick} type={'button'} className={'h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md flex justify-end'}>Save & continue</Button>
                </div>

            </form>
        </main>
    );
};

export default IdentificationStep;