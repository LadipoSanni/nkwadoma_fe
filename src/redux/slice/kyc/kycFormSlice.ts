import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FormSection {
    id: number;
    firstName: string;
    lastName: string;
    dob: string | undefined;
    relationship: string;
    ownership: string;
    proofType: string;
    proofFile: File | null;
    proofFileUrl?: string;
}

interface EntitySection {
    id: number;
    entityName: string;
    rcNumber: string;
    country: string | undefined;
    ownership?: string;
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
    beneficialOwner: {
        selectedForm: 'entity' | 'individual';
        entityData: {
            entityName: string;
            rcNumber: string;
            country: string | undefined;
            sections: EntitySection[];
        };
        individualData: {
            sections: FormSection[];
        };
    };
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
    beneficialOwner: {
        selectedForm: 'entity',
        entityData: {
            entityName: '',
            rcNumber: '',
            country: undefined,
            sections: [],
        },
        individualData: {
            sections: [],
        },
    },
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
        updateBeneficialOwner: (state, action: PayloadAction<Partial<KYCFormState['beneficialOwner']>>) => {
            state.beneficialOwner = {...state.beneficialOwner, ...action.payload};
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
