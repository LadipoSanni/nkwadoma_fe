import React, { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { cabinetGrotesk, inter } from "@/app/fonts";
import { MdClose } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInviteAdminMutation } from '@/service/admin/organization';

interface InviteAdminDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}

const InviteAdminDialog: React.FC<InviteAdminDialogProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [inviteAdmin] = useInviteAdminMutation();

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setErrors({ firstName: '', lastName: '', email: '' });
        setIsFormValid(false);
        setIsButtonDisabled(true);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { firstName: '', lastName: '', email: '' };

        if (!firstName || /\d/.test(firstName)) {
            newErrors.firstName = 'First name is required and should not contain numbers';
            valid = false;
        }

        if (!lastName || /\d/.test(lastName)) {
            newErrors.lastName = 'Last name is required and should not contain numbers';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        setErrors(newErrors);
        setIsFormValid(valid);
        setIsButtonDisabled(!valid);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                await inviteAdmin({
                    email,
                    firstName,
                    lastName,
                    role: 'PORTFOLIO_MANAGER'
                }).unwrap();
                console.log('Admin invited successfully');
                setIsModalOpen(false);
                resetForm();
            } catch (error) {
                console.error('Failed to invite admin:', error);
            }
        }
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, email]);

    useEffect(() => {
        if (isModalOpen) {
            validateForm();
        }
    }, [isModalOpen]);

    return (
        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) resetForm(); }}>
            {/*<DialogOverlay className="bg-[rgba(52,64,84,0.70)] " />*/}
            <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 pl-5 pr-2'}>
                <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                    <DialogTitle className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Invite Admin</DialogTitle>
                    <DialogClose asChild>
                        <button id="createCohortDialogCloseButton" className="absolute right-5">
                            <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950" />
                        </button>
                    </DialogClose>
                </DialogHeader>
                <form className={`${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`} onSubmit={handleSubmit}>
                    <main className={'grid gap-5'}>
                        <div className={'grid gap-2'}>
                            <Label htmlFor="firstName" className="block text-sm font-medium text-labelBlue">First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                        </div>
                        <div className={'grid gap-2'}>
                            <Label htmlFor="lastName" className="block text-sm font-medium text-labelBlue">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                        </div>
                        <div className={'grid gap-2'}>
                            <Label htmlFor="email" className="block text-sm font-medium text-labelBlue">Email Address</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter email address"
                                className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div className="flex justify-end gap-5 mt-3">
                            <Button
                                type="button"
                                className="h-[3.5625rem] w-[8.75rem] border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => { setIsModalOpen(false); resetForm(); }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={`h-[3.5625rem] w-[8.75rem] px-4 py-2 ${isButtonDisabled ? 'bg-[#D0D5DD] text-white' : 'bg-meedlBlue hover:bg-meedlBlue text-white'} rounded-md`}
                                disabled={isButtonDisabled}
                            >
                                Invite
                            </Button>
                        </div>
                    </main>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InviteAdminDialog;