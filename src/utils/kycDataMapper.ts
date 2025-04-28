import { RootState } from "@/redux/store";

const mapCountryCodeToEnum = (countryCode?: string): string | undefined => {
  if (!countryCode) return undefined;

  const countryMap: Record<string, string> = {
    "US": "UNITED_STATES",
    "GB": "UNITED_KINGDOM",
    "NG": "NIGERIA",
  };

  return countryMap[countryCode] || countryCode;
};

export const mapKycDataToApiRequest = (state: RootState) => {
  const { identification, sourceOfFunds, beneficialOwner, declaration } = state.kycForm;

  const beneficialOwners = [];

  if (beneficialOwner.selectedForm === 'entity') {
    if (beneficialOwner.entityData.entityName) {
      beneficialOwners.push({
        id: String(Date.now()),
        beneficialOwnerType: "COOPERATE",
        entityName: beneficialOwner.entityData.entityName,
        beneficialRcNumber: beneficialOwner.entityData.rcNumber,
        countryOfIncorporation: mapCountryCodeToEnum(beneficialOwner.entityData.country),
      });
    }

    beneficialOwner.entityData.sections.forEach(section => {
      if (section.entityName) {
        beneficialOwners.push({
          id: String(section.id),
          beneficialOwnerType: "COOPERATE",
          entityName: section.entityName,
          beneficialRcNumber: section.rcNumber,
          countryOfIncorporation: mapCountryCodeToEnum(section.country),
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
          ...(section.proofType === 'votersCard' && { votersCard: section.proofFile?.name || "uploaded-file" }),
          ...(section.proofType === 'nationalIdCard' && { nationalIdCard: section.proofFile?.name || "uploaded-file" }),
          ...(section.proofType === 'driverLicense' && { driverLicense: section.proofFile?.name || "uploaded-file" }),
        });
      }
    });
  }

  const formattedSourceOfFunds = sourceOfFunds.map(source => {
    if (source.startsWith("Source (specify others):")) {
      return source.replace("Source (specify others):", "").trim();
    }
    return source;
  });

  return {
    bankName: "Default Bank Account",
    bankNumber: "0101234504",
    phoneNumber: "1020202020",

    ...(identification.type === 'INDIVIDUAL' && {
      nin: identification.individual?.nin || "",
      bvn: identification.individual?.bvn || "",
      taxInformationNumber: "1234567890",
    }),
    ...(identification.type === 'COOPERATE' && {
      taxId: identification.corporate?.tin || "",
      rcNumber: identification.corporate?.rcNumber || "",
      taxInformationNumber: identification.corporate?.tin || "",
    }),

    sourceOfFunds: formattedSourceOfFunds,

    declarationAndAgreement: declaration.agreedToTerms,
    politicallyExposed: declaration.isPoliticallyExposedPerson === true,

    beneficialOwners: beneficialOwners.length > 0 ? beneficialOwners : [{
      id: "default",
      beneficialOwnerType: "INDIVIDUAL",
      beneficialOwnerFirstName: "",
      beneficialOwnerLastName: "",
      beneficialOwnerRelationship: "FATHER",
      beneficialOwnerDateOfBirth: new Date().toISOString(),
      percentageOwnershipOrShare: 0
    }],

    address: "",
  };
};
