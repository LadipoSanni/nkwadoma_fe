"use client"

import type React from "react"
import type { ReactNode } from "react"

interface ProfileSectionProps {
  title: string
  children: ReactNode
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <h2 className="text-sm sm:text-base py-3 px-2 font-semibold text-[#4D4E4D] bg-[#F2F2F2]">{title}</h2>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-6">{children}</div>
    </div>
  )
}

export default ProfileSection
