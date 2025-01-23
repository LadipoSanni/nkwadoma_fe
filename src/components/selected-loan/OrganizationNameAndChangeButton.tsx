import React from 'react';
import OrganizationImage from "@/reuseable/profile/Organization-image";
import {cabinetGroteskRegular} from "@/app/fonts";
import ChangeInstitutionModal from "@/components/loan/change-organization/index";
import {useAppSelector} from "@/redux/store";
import InitialsAvatar from '../../reuseable/avater/InitialAvater';

const OrganizationNameAndChangeButton = () => {
    const getInitials = (name: string): string => {
        const nameArray = name.split(' ');
        let initials = nameArray.map(word => word[0]).join('');
        if (initials.length > 2) {
            initials = initials.slice(0, 2);
        }
        return initials.toUpperCase();
    };

    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const { name, logoImage } = clickedOrganization || {};
    const initials = name ? getInitials(name) : 'N/A';

    return (
        <div
            data-testid="OrganizationNameAndChangeButtonContainer"
            id="organizationAndChangeButton"
            className={`flex items-center w-full gap-3`}>
            {logoImage ? (
                <OrganizationImage
                    src={logoImage}
                    alt={'organization image'}
                    id={'organizationImageOnLoan'}
                />
            ) : (
                <InitialsAvatar initials={initials} size={30} />
            )}
            <div data-testid="organizationNameContainer" id="organizationNameContainer"
                 className={`${cabinetGroteskRegular.className} text-2xl`}>
                {name}
            </div>
            <ChangeInstitutionModal />
        </div>
    );
};

export default OrganizationNameAndChangeButton;
