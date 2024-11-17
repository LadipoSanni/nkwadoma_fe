import React from 'react';


interface EmptyStateProps {
    title: string,
    description: string,
}

const LoanEmptyState: React.FC<EmptyStateProps> = ({title, description}) => {
    const blocks = [
        {borderColor: '#D0D5DD'},
        {borderColor: '#0D9B48'},
        {borderColor: '#D0D5DD'}
    ];


    return (
        <section data-testid="loanEmptyState" id={`loanEmptyState`} className="flex flex-col justify-center items-center gap-8 h-fit">
            <article data-testid="emptyStateBlocks" id={`emptyStateBlocks`} className="grid gap-4 place-content-center">
jikuhiojoiijiojojojoi
            </article>
            <footer data-testid="emptyStateFooter" id={`emptyStateFooter`} className="grid place-content-center gap-3 h-fit w-fit">
                <h1 data-testid="emptyStateTitle" id={`emptyStateTitle`}
                    className="text-xs text-center font-['IBM_Plex_Sans'] font-medium leading-[1.2] text-[#101828]">
                    {title.toLowerCase()}
                </h1>
                <p data-testid="emptyStateDescription" id={`emptyStateDescription`}
                   className="text-[0.875rem] text-center font-['IBM_Plex_Sans'] font-normal leading-[1.2] text-[#57595D]">
                    {description}
                </p>
            </footer>
        </section>
    );
};

export default LoanEmptyState;