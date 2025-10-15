import React, { forwardRef } from 'react';
import {MdSearch} from 'react-icons/md';
import {inter} from '@/app/fonts'

interface SearchInputProps {
    id: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    style?: string,
    testId?: string,
    placeholder?: string,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onMouseDown?: React.MouseEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>; 
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
    id,
    value,
    onChange,
    style,
    testId, 
    placeholder = "search",
    onKeyDown,
    onMouseDown,
    onFocus,
    autoFocus,
    onBlur
}: SearchInputProps, ref) => {
    return (
        <div
            className={`${inter.className} ${style} md:w-[20.25rem] w-full text-[14px] h-[2.8125rem] flex items-center gap-2 border border-neutral650 rounded-md p-3`}
            id={`${id}Block`}>
            <MdSearch className="text-neutral950 w-5 h-5"/>
            <input
                ref={ref}
                id={id}
                type="text"
                placeholder={placeholder}
                className="flex-grow outline-none bg-transparent h-full text-grey450"
                value={value}
                onChange={onChange}
                data-testid={testId}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onFocus={onFocus}
                autoFocus={autoFocus}
                onBlur={onBlur}
            />
        </div>
    );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;