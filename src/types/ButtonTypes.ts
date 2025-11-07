
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

export interface Trans {
    description: string,
    status: string,
    amount: string,
    paymentMode: string,
}

export const generateMockData = (numDays: number = 5): { date: string; details: Trans[] }[] => {
    const statuses: Trans["status"][] = ["pending", "successful", "failed"];
    const descriptions = [
        "Wallet funding",
        "Loan repayment",
        "Withdrawal to bank",
        "POS transaction",
        "Airtime purchase",
        "Bill payment",
        'This is an example of when a description is getting very long and lonnnnnnnnng'
    ];

    const paymentModes = [
        'Wallet',
        'Linked account',
    ]

    const data = Array.from({ length: numDays }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const details = Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map(() => ({
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            amount: `₦${(Math.random() * 20000 + 500).toFixed(0)}`,
            paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
        }));

        return {
            date: date.toISOString().split("T")[0],
            details,
        };
    });

    return data;
};


