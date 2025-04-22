import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSection {
    id: number;
    firstName: string;
    lastName: string;
    dob: string | undefined;
    relationship: string;
    ownership: string;
    proofType: string;
    proofFile: null;
}

interface EntitySection {
    id: number;
    entityName: string;
    rcNumber: string;
    country: string | undefined;
}


interface KYCFormState {
    identification: {
        nin: string;
        bvn: string;
    };
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
        nin: '',
        bvn: '',
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
        updateIdentification: (state, action: PayloadAction<{ nin: string; bvn: string }>) => {
            state.identification = action.payload;
        },
        updateSourceOfFunds: (state, action: PayloadAction<string[]>) => {
            state.sourceOfFunds = action.payload;
        },
        updateBeneficialOwner: (state, action: PayloadAction<Partial<KYCFormState['beneficialOwner']>>) => {
            state.beneficialOwner = { ...state.beneficialOwner, ...action.payload };
        },
        updateDeclaration: (state, action: PayloadAction<Partial<KYCFormState['declaration']>>) => {
            state.declaration = { ...state.declaration, ...action.payload };
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
