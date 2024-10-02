import React from 'react';


interface EmptyStateProps {
    title: string;
}

const LoanEmptyState: React.FC<EmptyStateProps> = ({title}) => {
    const blocks = [
        {borderColor: '#D0D5DD'},
        {borderColor: '#0D9B48'},
        {borderColor: '#D0D5DD'}
    ];

    const [firstWord, secondWord] = title.split(' ').slice(0, 2).map(word => word.toLowerCase());

    return (
        <section data-testid="loanEmptyState" id={`loanEmptyState`} className="flex flex-col justify-center items-center gap-8 h-[66.39vh]">
            <article data-testid="emptyStateBlocks" id={`emptyStateBlocks`} className="grid gap-4 place-content-center">
                {blocks.map((block, index) => (
                    <div
                        id={`empty_StateBlock`}
                        data-testid={`empty_StateBlock${index}`}
                        key={index}
                        className={`flex gap-2 place-content-center rounded w-[18vw] h-[7vh] border-2`}
                        style={{
                            borderColor: block.borderColor,
                            boxShadow: index === 1 ? '0px 2px 8px 0px rgba(99, 99, 99, 0.12)' : 'none'
                        }}
                    >
                        <div data-testid={`emptyStateBlockContent${index}`}
                             id={`emptyStateBlockContent`}
                             className="flex h-full w-full gap-2 p-4 items-center">
                            <div data-testid={`emptyStateBlockIcon${index}`} id={`emptyStateBlockIcon`} className="w-8 h-8 bg-[#F0F2F4] rounded-full"></div>
                            <div data-testid={`emptyStateBlockText${index}`} id={'emptyStateBlockText'} className="grid h-6 gap-2">
                                <div data-testid={`emptyStateBlockLine1${index}`} id={`emptyStateBlockLine1`}
                                     className="w-[12.5rem] h-2 bg-[#f0f2f4] rounded-[32px]"></div>
                                <div data-testid={`emptyStateBlockLine2${index}`} id={`emptyStateBlockLine2`}
                                     className="w-[8.875rem] h-2 bg-[#f0f2f4] rounded-[32px]"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </article>
            <footer data-testid="emptyStateFooter" id={`emptyStateFooter`} className="grid place-content-center gap-3 h-[3.1875rem] w-[20.625rem]">
                <h1 data-testid="emptyStateTitle" id={`emptyStateTitle`}
                    className="text-[1.125rem] text-center font-['IBM_Plex_Sans'] font-medium leading-[1.2] text-[#101828]">
                    {title.toLowerCase()}
                </h1>
                <p data-testid="emptyStateDescription" id={`emptyStateDescription`}
                   className="text-[0.875rem] text-center font-['IBM_Plex_Sans'] font-normal leading-[1.2] text-[#57595D]">
                    {`There are no ${firstWord} ${secondWord} available for this institute`}
                </p>
            </footer>
        </section>
    );
};

export default LoanEmptyState;