const { checkSchema } = require("express-validator");
const Account = require("../models/Account.model");

const checkPhoneValid = async (value) => {
  const vnPhoneNumberRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  if (!vnPhoneNumberRegex.test(value)) {
    throw new Error("Phone number isn't valid");
  }
};

// const isValidAccountType = async (value) => {
//   const accountTypes = ["Personal", "Organization"]
//   var result = accountTypes.find(type => type === value);
//   if(result === undefined || result === null) {
//     throw new Error('Type field only includes [Personal] or [Organization]');
//   }
// }

const personalProfileValidateSchema = checkSchema({
  LastName: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
  },
  FirstName: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
  },
  Address: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
  },
  Phone: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
    custom: {
      options: checkPhoneValid,
    },
  },
});

const organizationProfileValidateSchema = checkSchema({
  Org_Name: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
  },
  Address: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
  },
  Phone: {
    exists: true,
    notEmpty: {
      errorMessage: "field is required",
    },
    custom: {
      options: checkPhoneValid,
    },
  },
});

module.exports = {
  personalProfileValidateSchema,
  organizationProfileValidateSchema,
};
