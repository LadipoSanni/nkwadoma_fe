
export interface AuthButtonPropsType {
    height?: string,
    id: string,
    buttonText: string,
    width: string,
    textColor: string,
    backgroundColor: string,
    disable: boolean,
    handleClick: (e?: React.MouseEvent<HTMLButtonElement> )=> void;
    isLoading?: boolean;
    useCabinetGrotesk?: boolean;
    showBorder?: boolean;
    borderColor?: string;
}



