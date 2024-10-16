import React from 'react';
import {cabinetGrotesk} from '@/app/fonts';
import {MdClose} from "react-icons/md";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import { MdKeyboardArrowDown } from "react-icons/md";


const CreateCohortModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-MeedlDarkBlueGrey">
            <div className="bg-white h-[90vh]  p-5 gap-6 rounded-md w-[533px]">
                <div className="flex justify-between py-3 items-center">
                    <h2 className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Create
                        Cohort</h2>
                    <button className={'h-6 w-6'}>
                        <MdClose className="text-neutral950 h-6 w-6  cursor-pointer"/>
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="cohortName" className="block text-sm font-medium text-gray-700">Cohort
                            Name</Label>
                        <Input type="text" id="cohortName" name="cohortName" placeholder="Cohort Name"/>
                    </div>
                    <div>
                        <Label htmlFor="program" className="block text-sm font-medium text-gray-700">Program</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Program">Select Program</SelectValue>
                                    <MdKeyboardArrowDown className="ml-2 h-5 w-5"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"light"}>Program 1</SelectItem>
                                    <SelectItem value={"dark"}>Program 2</SelectItem>
                                    <SelectItem value={"light"}>Program 3</SelectItem>
                                </SelectContent>
                            </Select>
                    </div>
                    <div>
                        <Label htmlFor="date" className="block text-sm font-medium text-gray-700">Start Date</Label>
                        <input type="date" id="date" name="date"
                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    </div>
                    <div>
                        <Label htmlFor="description"
                               className="block text-sm font-medium text-gray-700">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description"/>
                    </div>
                </form>
            </div>
        </div>
);
};

export default CreateCohortModal;