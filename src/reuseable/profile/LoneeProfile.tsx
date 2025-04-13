import React from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const TraineeProfile = () => {
    return (<main id="traineeProfileMain" className={'flex gap-1 md:w-[13.75rem] justify-between items-center'}>
        <div id="profileContainer" className={'flex gap-[9px]'}>
            <div id="profileIconContainer"
                 className="w-10 h-10 rounded-full bg-LearnSpaceMintGreen flex items-center justify-center">
            <span id="profileInitials" className="text-[#29804B] text-base font-normal leading-[120%]">
                VC
            </span>
            </div>
            <main id={'LoneeNameAndRoleDisplay'} className="gap-1 hidden md:grid">
                <h1 className="text-[14px] font-medium leading-[120%] text-[var(--Default-colors-Body,#101828)] ]">Vanessa
                    Oluchukwu</h1>
                <p className="text-[12px] font-normal leading-[120%] text-[var(--Foundation-Blue-blue-800,#72757A)]">Loanee</p>
            </main>
        </div>
        {/*<ExpandMoreIcon/>*/}
    </main>);
};

export default TraineeProfile;