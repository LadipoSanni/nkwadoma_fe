import React from 'react';
import {cabinetGroteskRegular} from "@/app/fonts";


interface EmptyStateProps {
    title: string,
    description: string,
    icon: string|React.ReactElement| JSX.Element,
    iconBg: string,
    id: string,
    descriptionId?: string,
}

const LoanEmptyState: React.FC<EmptyStateProps> = ({title,id, descriptionId,description, icon, iconBg}) => {

    return (
        <section data-testid={id} id={id} className="grid md:grid justify-center items-center w-fit md:w-fit md:h-fit gap-8 h-fit">
            <article
                style={{backgroundColor: iconBg}}
                data-testid="emptyStateBlocks" id={`emptyStateBlocks`} className={`grid place-items-center gap-4 h-[6rem] w-[6rem] md:h-[6rem] md:w-[6rem] rounded-full mr-auto ml-auto bg-${iconBg} place-content-center`}>
                {icon}
            </article>
            <footer id={'loanEmptyStateFooter'} data-testid="loanEmptyStateFooter"
                    className={`grid gap-2 `}
            >
                <span id={ descriptionId ? descriptionId :`loanEmptyStateTitle`} data-testid={descriptionId ? descriptionId :'loanEmptyStateTitle'} className={` ${cabinetGroteskRegular.className} mr-auto ml-auto  text-black500 `}>{title}</span>
                <span data-testid={'loanEmptyStateDescription'} id={'loanEmptyStateDescription'} className={` md:text-xs text-xs text-[#57595D] md:text-[#57595D] `}>{description}</span>
            </footer>
        </section>
    );
};

export default LoanEmptyState;