"use client"
import * as React from "react";
import CreateProgramButton from "@/features/adminFeatures/program/CreateProgramButton";

const Program = () => {

    return (
        <div>
            <CreateProgramButton buttonText={"Create Program"} title={"Create Program"} programName={"Business Admin"} programType={"4"} programDeliveryType={"2years"} programMode={"2semesters"} programDuration={"3years"} programDescription={"Business Administration manage an organization's resources, time and people"}/>
        </div>
    )
}
export default Program


