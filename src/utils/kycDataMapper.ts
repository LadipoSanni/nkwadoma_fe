import { RootState } from "@/redux/store";

export const mapKycDataToApiRequest = (state: RootState) => {
  const { identification, sourceOfFunds, beneficialOwner, declaration } = state.kycForm;
  
  const beneficialOwners = [];
  
  if (beneficialOwner.selectedForm === 'entity') {
    if (beneficialOwner.entityData.entityName) {
      beneficialOwners.push({
        id: String(Date.now()),
        beneficialOwnerType: "ENTITY",
        entityName: beneficialOwner.entityData.entityName,
        beneficialRcNumber: beneficialOwner.entityData.rcNumber,
        countryOfIncorporation: beneficialOwner.entityData.country,
      });
    }
    
    beneficialOwner.entityData.sections.forEach(section => {
      if (section.entityName) {
        beneficialOwners.push({
          id: String(section.id),
          beneficialOwnerType: "ENTITY",
          entityName: section.entityName,
          beneficialRcNumber: section.rcNumber,
          countryOfIncorporation: section.country,
        });
      }
    });
  } else {
    beneficialOwner.individualData.sections.forEach(section => {
      if (section.firstName && section.lastName) {
        beneficialOwners.push({
          id: String(section.id),
          beneficialOwnerType: "INDIVIDUAL",
          beneficialOwnerFirstName: section.firstName,
          beneficialOwnerLastName: section.lastName,
          beneficialOwnerRelationship: section.relationship.toUpperCase(),
          beneficialOwnerDateOfBirth: section.dob,
          percentageOwnershipOrShare: parseFloat(section.ownership) || 0,
          [section.proofType]: section.proofFile?.name || "uploaded-file"
        });
      }
    });
  }
  
  return {
    ...(identification.type === 'INDIVIDUAL' && {
      nin: identification.individual?.nin || "",
      bvn: identification.individual?.bvn || "",
    }),
    ...(identification.type === 'COOPERATE' && {
      taxId: identification.corporate?.tin || "",
      rcNumber: identification.corporate?.rcNumber || "",
      countryOfIncorporation: identification.corporate?.countryOfIncorporation || "",
    }),
    
    personalOrJointSavings: sourceOfFunds.includes('Personal or joint savings') ? "Yes" : "",
    employmentIncome: sourceOfFunds.includes('Employment income') ? "Yes" : "",
    salesOfAssets: sourceOfFunds.includes('Sales of assets') ? "Yes" : "",
    donation: sourceOfFunds.includes('Donation') ? "Yes" : "",
    inheritanceOrGift: sourceOfFunds.includes('Inheritance or gift') ? "Yes" : "",
    compensationOfLegalSettlements: sourceOfFunds.includes('Compensation of legal settlements') ? "Yes" : "",
    profitFromLegitimateActivities: sourceOfFunds.includes('Profit from legitimate activities') ? 1 : 0,
    
    businessRevenue: sourceOfFunds.includes('Business revenue') ? "Yes" : "",
    investmentIncome: sourceOfFunds.includes('Investment income') ? "Yes" : "",
    salesOfCorporateAssets: sourceOfFunds.includes('Sales of corporate assets') ? "Yes" : "",
    othersSourceOfFunds: sourceOfFunds.includes('Others') ? "Yes" : "",
    
    declarationAndAgreement: declaration.agreedToTerms,
    politicallyExposed: declaration.isPoliticallyExposedPerson === true,
    
    ...(declaration.isPoliticallyExposedPerson && {
      politicalPosition: declaration.politicalPosition || "",
      relationship: declaration.relationship || "",
      country: declaration.country || ""
    }),
    
    beneficialOwners: beneficialOwners.length > 0 ? beneficialOwners : [{
      id: "default",
      beneficialOwnerType: "INDIVIDUAL",
      beneficialOwnerFirstName: "",
      beneficialOwnerLastName: "",
      beneficialOwnerRelationship: "FATHER",
      percentageOwnershipOrShare: 0
    }]
  };
};