import React, { useState } from 'react';
import ProfileSection from '@/reuseable/profile/LoaneeProfileSection';
import UpdateLoaneeProfile from './update-profile-modal/updateProfile';
import LoaneeUploadButton from '@/reuseable/buttons/loaneeUpdateButton';
import { useViewUserDetailQuery } from '@/service/users/Loanee_query';

interface ProfileProps {
    whoseProfile: "company" | "user",
    companyUrl?: string ;
}

const LoaneeProfileSetting = ({whoseProfile, companyUrl}: ProfileProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: profileData} = useViewUserDetailQuery({});
    const handleUpdateSuccess = () => {
        setIsModalOpen(false);
    };
    
  return (
   <div className="py-1 px-1 md:py-4 md:px-14">
   <div className="w-full border border-[#ECECEC] rounded-lg py-1 md:py-5">
   <div className=" w-full flex justify-between md:px-6 px-1 py-4">
      <div>
        <h2 className="text-md md:text-xl font-bold text-[#212221] md:px-1 px-1">Profile</h2>
        <p className="text-xs md:text-sm text-gray-500 md:px-1 px-1">Manage and update your personal details</p>
      </div>
    
        <LoaneeUploadButton url={companyUrl === 'company' ? companyUrl : profileData?.userIdentity?.avatar} whose={whoseProfile} />
    </div>

   <div className="space-y-6 md:space-y-6 w-full">
    <ProfileSection title="Basic details">
     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Age</p>
       <p className="text-sm sm:text-base text-[#4D4E4D] px-2 py-1">{profileData?.userIdentity?.dateOfBirth}betty</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Gender</p>
       <p className="text-sm sm:text-base text-[#4D4E4D] px-2 py-1">{profileData?.userIdentity?.gender}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">State of origin</p>
       <p className="text-sm sm:text-base text-[#4D4E4D] px-2 py-1">{profileData?.userIdentity?.stateOfOrigin}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-3 py-1">State of residence</p>
       <p className="text-sm sm:text-base text-[#4D4E4D] px-2 py-1">{profileData?.userIdentity?.stateOfResidence}</p>
      </div>
     </div>
    </ProfileSection>

    <ProfileSection title="Contact">
     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Email</p>
       <p className="text-sm sm:text-base text-[#4D4E4D] break-all">{profileData?.userIdentity?.email}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Phone</p>
       <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.userIdentity?.phoneNumber}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Address</p>
       <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.userIdentity?.residentialAddress}</p>
      </div>
     </div>
    </ProfileSection>

    <ProfileSection title="Education">
     <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
      {profileData?.highestLevelOfEducation && (
       <div>
        <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Level of education</p>
        <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.highestLevelOfEducation}</p>
       </div>
      )}
      {profileData?.institutionName && (
       <div>
        <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Institution</p>
        <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.institutionName}</p>
       </div>
      )}
     </div>
    </ProfileSection>

    <ProfileSection title="Next of Kin">
     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Full name</p>
       <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.nextOfKin?.firstName} {profileData?.nextOfKin?.lastName}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Relationship</p>
       <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.nextOfKin?.nextOfKinRelationship}</p>
      </div>
      <div>
       <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Email</p>
       <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.nextOfKin?.email}</p>
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium text-[#4D4E4D] px-2 py-1">Address</p>
        <p className="text-sm sm:text-base text-[#4D4E4D]">{profileData?.nextOfKin?.contactAddress}</p>
      </div>
     </div>
    </ProfileSection>
   </div>

   <div className=" w-full flex md:justify-end justify-center mt-8 px-6">
    <button
     onClick={() => setIsModalOpen(true)}
     className="bg-[#142854] text-white md:px-6 px-20 py-2 rounded-lg font-medium w-auto"
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
