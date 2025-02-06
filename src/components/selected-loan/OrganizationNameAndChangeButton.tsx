import React, {useState} from 'react';
import OrganizationImage from "@/reuseable/profile/Organization-image";
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import ChangeInstitutionModal from "@/components/loan/change-organization/index";
import {useAppSelector} from "@/redux/store";
import InitialsAvatar from '../../reuseable/avater/InitialAvater';
import {Cross2Icon} from "@radix-ui/react-icons";
import CreateInvestmentVehicle from "@/components/portfolio-manager/fund/Create-investment-vehicle";
import TableModal from "@/reuseable/modals/TableModal";
import {Button} from "@/components/ui/button";

const OrganizationNameAndChangeButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const initials = name ? getInitials(name) : 'AO';

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
                {name || "All organizations"}
            </div>
            <Button id="changeOrganizationButton" data-testid={'changeOrganizationButton'} size={"lg"}
                    variant={"secondary"}
                    className={` ${inter.className} text-meedlBlue pt-0.5 underline w-fit h-fit md:font-size-0.875rem md:font-light px-1 bg-blue500 rounded `}
                    onClick={()=> setIsModalOpen(true)}
            >Change
            </Button>
            {
                <TableModal
                    isOpen={isModalOpen}
                    closeModal={()=> setIsModalOpen(false)}
                    className='pb-1'
                    headerTitle='Organization'
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    width={"40%"}
                >
                    <ChangeInstitutionModal />
                </TableModal>
            }
            {/*<ChangeInstitutionModal />*/}
        </div>
    );
};

export default OrganizationNameAndChangeButton;
