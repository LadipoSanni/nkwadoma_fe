"use client"

import type React from "react"
import type { ReactNode } from "react"

interface ProfileSectionProps {
  title: string
  children: ReactNode
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-secondary/50 px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
        <h2 className="text-sm sm:text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-6">{children}</div>
    </div>
  )
}

export default ProfileSection
