"use client"

import type React from "react"
import { inter } from "@/app/fonts";
import type { ReactNode } from "react";

interface ProfileSectionProps {
  title: string
  children: ReactNode
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-3 md:py-2">
        <h2 className={` text-[12px] md:text-[14px] py-3 px-2 rounded-sm font-medium ${inter.className} text-[#4D4E4D] bg-[#F2F2F2] `}>{title}</h2>
      </div>
      <div className={` px-4 md:px-6 py-4 md:py-2 text-[#4D4E4D] ${inter.className} font-normal `}>{children}</div>
    </div>
  )
}

export default ProfileSection
