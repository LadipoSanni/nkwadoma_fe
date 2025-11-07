import { inter } from "@/app/fonts";
import React, { useState } from "react";
import Modal from "@/reuseable/modals/TableModal";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useGetUserDetailsQuery } from "@/service/users/api";
import UpdateProfile from "./update-profile-modal/Update-profile";
import ProfileSection from "@/reuseable/profile/LoaneeProfileSection";
import LoaneeUploadButton from "@/reuseable/buttons/loaneeUpdateButton";

interface ProfileProps {
  whoseProfile: "company" | "user";
  companyUrl?: string;
}

const LoaneeProfileSetting = ({ whoseProfile, companyUrl }: ProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: profileData, refetch } = useGetUserDetailsQuery({});

  if (!profileData) {
    return (
      <div className='py-5 text-center text-gray-500'>
        No profile data found.
      </div>
    );
  }
  const avatarUrl =
    whoseProfile === "company" ? companyUrl : profileData?.data?.avatar;

  return (
    <div className='py-1 px-1 md:py-4 md:px-14'>
      <div className='w-full border border-[#ECECEC] rounded-lg py-1 md:py-5'>
        <div className=' w-full flex justify-between md:px-6 px-1 py-4'>
          <div>
            <h2
              className={` text-md md:text-[18px] md:font-semibold py-1 ${inter.className} font-bold text-[#212221] md:px-1 px-1 `}
            >
              Profile
            </h2>
            <p
              className={` text-xs md:text-sm font-normal ${inter.className} text-gray-500 md:px-1 px-1 `}
            >
              Manage and update your personal details
            </p>
          </div>

          <LoaneeUploadButton
            whose={whoseProfile}
            url={avatarUrl}
            onUploadSuccess={refetch}
          />
        </div>

        <div className='space-y-6 md:space-y-6 w-full'>
          <ProfileSection title='Basic details'>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Age
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.dateOfBirth}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Gender
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.gender}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  State of origin
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.stateOfOrigin}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  State of residence
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.stateOfResidence}
                </p>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title='Contact'>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Email
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.email}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Phone
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.phoneNumber}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Address
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.residentialAddress}
                </p>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title='Education'>
            <div className='grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Level of education
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.levelOfEducation}
                </p>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title='Next of Kin'>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Full name
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.nextOfKinFirstName} {profileData?.data?.nextOfKinLastName}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Relationship
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.nextOfKinRelationship}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Email
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.nextOfKinEmail}
                </p>
              </div>
              <div>
                <p className='text-xs sm:text-sm font-normal text-[#4D4E4D] px-2 py-1'>
                  Address
                </p>
                <p className='text-sm sm:text-base font-medium text-[#4D4E4D] px-2 py-1'>
                  {profileData?.data?.nextOfKinContactAddress}
                </p>
              </div>
            </div>
          </ProfileSection>
        </div>

        <div className=' w-full flex md:justify-end justify-center mt-8 px-6'>
          <button
            id={"update-profile"}
            data-testid={"update-profile"}
            onClick={() => setIsModalOpen(true)}
            className='bg-[#142854] text-white md:px-5 md:py-2 px-20 py-2 text-sm rounded-[6px] font-bold'
          >
            Update profile
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          headerTitle='Update profile'
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          styeleType='StyleBodyTwo'
          width='36%'
        >
          <UpdateProfile setIsOpen={setIsModalOpen} refetch={refetch} />
        </Modal>
      </div>
    </div>
  );
};

export default LoaneeProfileSetting;
