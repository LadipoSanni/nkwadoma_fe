import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9\-'/ ]*[a-zA-Z0-9]$/,
      // "Name can include letters, numbers, hyphens,slash and apostrophes only, and must start with a letter."
      "Name must start with a letter and end with a letter or number and can include  hyphens,slash and underscore only "
    )
    .test(
      "valid-name",
      "Name cannot be only numbers or special characters.",
      (value = "") => {
        const trimmedValue = value.trim();
        if (trimmedValue === "") {
          return true;
        }
        const hasLetter = /[a-zA-Z]/.test(value);
        const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
        return hasLetter && !isOnlyNumbersOrSpecials;
      }
    )
    .max(200, "Name cannot be more than 200 characters.")
    .required("Name is required"),
  fundManager: Yup.string()
    .trim()
    .matches(/^[a-zA-Z][a-zA-Z\-' ]*$/, "Invalid fund manager name")
    .max(100, "Fund manager cannot be more than 100 characters.")
    .test(
      "valid-fundManager",
      "Fund manager cannot be only numbers or special characters.",
      (value = "") => {
        const trimmedValue = value.trim();
        if (trimmedValue === "") {
          return true;
        }
        const hasLetter = /[a-zA-Z]/.test(value);
        const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
        return hasLetter && !isOnlyNumbersOrSpecials;
      }
    )
    .required("Fund manager is required"),
  size: Yup.string().required("Vehicle size is required"),
  minimumInvestmentAmount: Yup.string()
    .required("Minimum investment amount is required")
    .test(
      "minimum-less-or-equal-to-size",
      "Minimum Investment Amount must be less than or equal to Vehicle Size.",
      function (value) {
        const { size } = this.parent;
        return !value || !size || parseFloat(value) <= parseFloat(size);
      }
    ),
  tenure: Yup.string()
    .trim()
    .required("Tenor is required")
    .matches(
      /^[1-9]\d{0,2}$/,
      "Tenor must be a three-digit positive number and cannot start with zero."
    ),
  rate: Yup.number()
    .min(0, "Rate must be at least 1.")
    .max(100, "Rate must be at most 100.")
    .required("Rate is required"),
  mandate: Yup.string()
    .trim()
    .max(2500, "Mandate must be 2500 characters or less")
    .required("Mandate is required")
    .test("not-empty", "Mandate is required.", (value = "") => {
      const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
      return sanitizedValue !== "";
    }),
  bankPartner: Yup.string().trim().required("Bank partner is required"),
  trustee: Yup.string()
    .trim()
    .max(100, "Trustee cannot be more than 100 characters.")
    .matches(/^[a-zA-Z][a-zA-Z\-' ]*$/, "Invalid trustee name")
    .required("Trustee is required"),
  custodian: Yup.string()
    .trim()
    .required("Custodian is required")
    .max(100, "Custodian cannot be more than 100 characters.")
    .matches(/^[a-zA-Z][a-zA-Z\-' ]*$/, "Invalid custodian name"),
  startDate: Yup.date().required("Start date is required").nullable(),
});

export const draftValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Vehicle name is required to save to draft"),
});


export const LoaneeInformationvalidationSchema = Yup.object().shape({
  alternateEmail: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  alternatePhoneNumber: Yup.string()
  // .transform((value) => value.replace(/\s+/g, '')) 
  // .matches(/^\+?\d{7,20}$/, 'Phone number must be 7 to 20 digits ')
    .required('Phone number is required')
    .test(
      'phone-validation',
      ' ', 
      function(value) {
        if (this.parent.alternatePhoneNumberError) {
          return true;
        }
        if (!value) return false;
        return /^\+?\d{7,20}$/.test(value.replace(/\s+/g, ''));
      }
    ),
  firstName: Yup.string()
    .trim()
    .required('First name is required'),
  lastName: Yup.string()
    .trim()
    .required('Last name is required'),
  phoneNumber: Yup.string()
  // .transform((value) => value.replace(/\s+/g, '')) 
  // .matches(/^\+?\d{7,20}$/, 'Phone number must be 7 to 20 digits ')
  .required('Next of kin phone number is required')
  .test(
    'phone-validation',
    ' ',
    function(value) {
      if (this.parent.alternatePhoneNumberError) {
        return true;
      }
      if (!value) return false;
      return /^\+?\d{7,20}$/.test(value.replace(/\s+/g, ''));
    }
  ),
  alternateContactAddress: Yup.string()
    .required('Residential address is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  nextOfKinRelationship: Yup.string()
    .required('Relationship is required'), 
  contactAddress: Yup.string()
    .required('Contact address is required'),
});


export const validationStaffSchema = Yup.object().shape({
       firstName: Yup.string()
                  .trim()
                  .required('First name is required')
                  .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
      lastName: Yup.string()
                  .trim()
                  .required('Last name is required')
                  .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
            .required('Email address is required'),
        adminRole:Yup.string()
              .required('Role is required'),
    })


   export const organizationValidationSchema = Yup.object().shape({
            name: Yup.string()
                .trim()
                .required('Name is required')
                .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
            email: Yup.string()
                .email('Invalid email address')
                // .matches(/^\S*$/, 'Email address should not contain spaces')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
                .required('Email address is required'),
            industry: Yup.string()
                .required('Industry is required'),
            serviceOffering: Yup.string()
                .required('Service is required'),
            rcNumber: Yup.string()
                .trim()
                .required('Registration number is required')
                .matches(/^RC\d{7}$/, 'RC Number must start with "RC" followed by 7 digits'),
            tin: Yup.string()
                .trim()
                .required('Tax number is required')
                .min(9, 'Tax number must be at least 9 characters long')
                .max(15, 'Must be the length of 15 characters long')
                .matches(/^[A-Za-z0-9-]*$/, 'Tax number can only contain letters, numbers, and hyphens, and must not start with a hyphen'),
            adminFirstName: Yup.string()
                .trim()
                .required('Admin first name is required'),
            adminLastName: Yup.string()
                .trim()
                .required('Admin last name is required'),
            phoneNumber: Yup.string(),
                // .required('Phone number is required')
                // .matches(/^(0)(70|71|80|81|90|91)\d{8}$/, 'Invalid phone number'),
            adminEmail: Yup.string()
                .email('Invalid email address')
                // .matches(/^\S*$/, 'Email address should not contain spaces')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
                .required('Admin email address is required')
                .test(
                    'email-different', 'Admin email address must be different from company email address',
                    function () {
                        const {email, adminEmail} = this.parent;
                        return email !== adminEmail;
                    }),
            websiteAddress: Yup.string()
            .matches(
                /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                'Enter a valid website URL'
            )
            .nullable(),
        })