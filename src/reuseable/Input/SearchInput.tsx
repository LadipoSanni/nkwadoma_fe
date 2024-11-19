import React from 'react';
import {MdSearch} from 'react-icons/md';
import {inter} from '@/app/fonts'

interface SearchInputProps {
    id: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({id,value,onChange}: SearchInputProps) => {
    return (
        <div
            className={`${inter.className} md:w-[20.25rem] w-full text-[14px] h-[2.8125rem] flex items-center gap-2 border border-neutral650 rounded-md p-3`}
            id={`${id}Block`}>
            <MdSearch className="text-neutral950 w-5 h-5"/>
            <input
                id={id}
                type="text"
                placeholder="Search"
                className="flex-grow outline-none bg-transparent h-full text-grey450"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchInput;