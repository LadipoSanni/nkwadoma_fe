import { RootState } from "@/redux/store";
import { mapCountryToEnum } from "./countryMapper";

export const mapCountryCodeToEnum = mapCountryToEnum;

export const mapKycDataToApiRequest = (state: RootState, declarationOverride?: { agreedToTerms: boolean }) => {
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
          ...(section.proofType === 'voters_card' && { votersCard: section.proofFileUrl || section.proofFile?.name || "uploaded-file" }),
          ...(section.proofType === 'national_id' && { nationalIdCard: section.proofFileUrl || section.proofFile?.name || "uploaded-file" }),
          ...(section.proofType === 'driverLicense' && { driverLicense: section.proofFileUrl || section.proofFile?.name || "uploaded-file" }),
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

  const politicallyExposedPeople = declaration.isPoliticallyExposedPerson
      ? [
        {
          positionHeld: declaration.politicalPosition || "",
          country: declaration.country || "",
          relationship: declaration.relationship || "",
          additionalInformation: "",
        },
      ]
      : [];

  return {
    bankName: "Default Bank Account",
    bankNumber: "0101234504",
    phoneNumber: "1020202020",

    ...(identification.type === 'INDIVIDUAL' && {
      nin: identification.individual?.nin || "",
      bvn: identification.individual?.bvn || "",
      taxInformationNumber: identification.individual?.tin || "",
      taxId: identification.individual?.tin || "",
    }),
    ...(identification.type === 'COOPERATE' && {
      taxId: identification.corporate?.tin || "",
      rcNumber: identification.corporate?.rcNumber || "",
      taxInformationNumber: identification.corporate?.tin || "",
    }),

    sourceOfFunds: formattedSourceOfFunds,

    declarationAndAgreement: declarationOverride?.agreedToTerms !== undefined ? declarationOverride.agreedToTerms : declaration.agreedToTerms,
    politicallyExposed: declaration.isPoliticallyExposedPerson === true,
    politicallyExposedPeople,

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
