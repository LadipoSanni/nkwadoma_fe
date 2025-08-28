import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export interface BeneficialType {
    id: number,
    beneficialOwnerType: string,
    entityName?: string,
    beneficialRcNumber: string,
    countryOfIncorporation?: string,
    beneficialOwnerFirstName?: string,
    beneficialOwnerLastName?: string,
    beneficialOwnerRelationship?: string,
    beneficialOwnerDateOfBirth: string,
    percentageOwnershipOrShare?: number,
    votersCard?: string,
    nationalIdCard?: string,
    "driverLicense"?: string,
    type: string,
}

interface KYCFormState {
    identification: {
        type: 'INDIVIDUAL' | 'COOPERATE';
        individual?: {
            nin: string;
            bvn: string;
            tin?: string;
        };
        corporate?: {
            tin: string;
            rcNumber: string;
            countryOfIncorporation: string;
        };
    }
    sourceOfFunds: string[];
    beneficialOwner: BeneficialType[];
    declaration: {
        isPoliticallyExposedPerson: boolean | null;
        politicalPosition?: string;
        relationship?: string;
        country?: string;
        agreedToTerms: boolean;
    };
}

const initialState: KYCFormState = {
    identification: {
        type: 'INDIVIDUAL',
        individual: {
            nin: '',
            bvn: '',
            tin: ''
        },
        corporate: {
            tin: '',
            rcNumber: '',
            countryOfIncorporation: ''
        },
    },
    sourceOfFunds: [],
    beneficialOwner: [
        {
            id: 0,
            beneficialOwnerType: "",
            entityName: "",
            beneficialRcNumber: "",
            countryOfIncorporation: "",
            beneficialOwnerFirstName: "",
            beneficialOwnerLastName: "",
            beneficialOwnerRelationship: "",
            beneficialOwnerDateOfBirth: "",
            percentageOwnershipOrShare: 0,
            votersCard: "",
            nationalIdCard: "",
            driverLicense: "",
            type: ''
        },
    ],
    declaration: {
        isPoliticallyExposedPerson: null,
        agreedToTerms: false,
    },
};

const kycFormSlice = createSlice({
    name: 'kycForm',
    initialState,
    reducers: {
        updateIdentification: (state, action: PayloadAction<{
            type: 'INDIVIDUAL' | 'COOPERATE';
            data: {
                nin?: string;
                bvn?: string;
                tin?: string;
                rcNumber?: string;
                countryOfIncorporation?: string;
            };
        }>) => {
            state.identification.type = action.payload.type;
            if (action.payload.type === 'INDIVIDUAL') {
                state.identification.individual = {
                    nin: action.payload.data.nin || '',
                    bvn: action.payload.data.bvn || '',
                    tin: action.payload.data.tin || ''
                };
            } else {
                state.identification.corporate = {
                    tin: action.payload.data.tin || '',
                    rcNumber: action.payload.data.rcNumber || '',
                    countryOfIncorporation: action.payload.data.countryOfIncorporation || ''
                };
            }
        },
        updateSourceOfFunds: (state, action: PayloadAction<string[]>) => {
            state.sourceOfFunds = action.payload;
        },
        updateBeneficialOwner: (state, action: PayloadAction<BeneficialType[]>) => {
            state.beneficialOwner = action.payload;
        },
        updateDeclaration: (state, action: PayloadAction<Partial<KYCFormState['declaration']>>) => {
            state.declaration = {...state.declaration, ...action.payload};
        },
    },
});

export const {
    updateIdentification,
    updateSourceOfFunds,
    updateBeneficialOwner,
    updateDeclaration,
} = kycFormSlice.actions;

export default kycFormSlice.reducer;
