import React, { useState } from 'react';
import { LoaneetDetails } from '@/types/loanee';
import ProfileSection from '@/reuseable/profile/LoaneeProfileSection';
import UpdateLoaneeProfile from './update-profile-modal/updateProfile';
import LoaneeUploadButton from '@/reuseable/buttons/loaneeUpdateButton';

interface ProfileProps {
    whoseProfile: "company" | "user",
    userName: string | undefined,
    userEmail: string | undefined,
    companyUrl?: string ;
}

const LoaneeProfileSetting = ({whoseProfile, companyUrl}: ProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState<LoaneetDetails | null>(null);
    const handleUpdateSuccess = (updatedData: { education: string, stateOfResidence: string }) => {
        setProfileData(prev => prev ? {
            ...prev,
            highestLevelOfEducation: updatedData.education,
            userIdentity: {
                ...prev.userIdentity,
                stateOfResidence: updatedData.stateOfResidence
            }
        } : null);
        setIsModalOpen(false);
    };


  return (
   <div className="py-5">
   <div className="w-full border border-[#D7D7D7] rounded-lg py-5">
   <div className="flex justify-between items-start px-5 py-1">
    <div>
     <h2 className="text-2xl font-bold text-gray-900 px-2">Profile</h2>
     <p className="text-sm text-gray-500 px-2 py-1">Manage and update your personal details</p>
    </div>
    
    <LoaneeUploadButton url={companyUrl} whose={whoseProfile} />
   </div>

   <div className="space-y-4 md:space-y-6 w-full">
    <ProfileSection title="Basic details">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Age</p>
       <p className="text-sm sm:text-base text-foreground px-2 py-1">{profileData?.userIdentity?.dateOfBirth}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Gender</p>
       <p className="text-sm sm:text-base text-foreground px-2 py-1">{profileData?.userIdentity?.gender}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">State of origin</p>
       <p className="text-sm sm:text-base text-foreground px-2 py-1">{profileData?.userIdentity?.stateOfOrigin}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-3 py-1">State of residence</p>
       <p className="text-sm sm:text-base text-foreground px-2 py-1">{profileData?.userIdentity?.stateOfResidence}</p>
      </div>
     </div>
    </ProfileSection>

    <ProfileSection title="Contact">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Email</p>
       <p className="text-sm sm:text-base text-foreground break-all">{profileData?.userIdentity?.email}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Phone</p>
       <p className="text-sm sm:text-base text-foreground">{profileData?.userIdentity?.phoneNumber}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Address</p>
       <p className="text-sm sm:text-base text-foreground">{profileData?.userIdentity?.residentialAddress}</p>
      </div>
     </div>
    </ProfileSection>

    <ProfileSection title="Education">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {profileData?.highestLevelOfEducation && (
       <div>
        <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Level of education</p>
        <p className="text-sm sm:text-base text-foreground">{profileData?.highestLevelOfEducation}</p>
       </div>
      )}
      {profileData?.institutionName && (
       <div>
        <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Institution</p>
        <p className="text-sm sm:text-base text-foreground">{profileData?.institutionName}</p>
       </div>
      )}
     </div>
    </ProfileSection>

    <ProfileSection title="Next of Kin">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Full name</p>
       <p className="text-sm sm:text-base text-foreground">{profileData?.nextOfKin?.firstName} {profileData?.nextOfKin?.lastName}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Relationship</p>
       <p className="text-sm sm:text-base text-foreground">{profileData?.nextOfKin?.nextOfKinRelationship}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Email</p>
       <p className="text-sm sm:text-base text-foreground break-all">{profileData?.nextOfKin?.email}</p>
      </div>
     </div>
     <div className="mt-4 sm:mt-6">
      <p className="text-xs sm:text-sm font-medium text-foreground/70 px-2 py-1">Address</p>
      <p className="text-sm sm:text-base text-foreground">{profileData?.nextOfKin?.contactAddress}</p>
     </div>
    </ProfileSection>
   </div>

   <div className="flex justify-end mt-8 px-6">
    <button
     onClick={() => setIsModalOpen(true)}
     className="bg-[#142854] text-white px-6 py-2 rounded-lg font-medium"
    >
     Update profile
    </button>
   </div>

   <UpdateLoaneeProfile
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onUpdateSuccess={handleUpdateSuccess}
    currentData={{
     education: profileData?.highestLevelOfEducation || '',
     stateOfResidence: profileData?.userIdentity?.stateOfResidence || ''
    }}
   />
  </div>
  </div>
 );
};


export default LoaneeProfileSetting;
