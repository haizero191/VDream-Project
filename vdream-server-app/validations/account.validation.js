const { checkSchema } = require('express-validator');
const Account = require('../models/account.model');


const checkIfEmailExists = async (value) => {
  const existingAccount = await Account.findOne({ Email: value });
  if (existingAccount) {
    throw new Error('Email is already in use');
  }
}

const isValidAccountType = async (value) => {
  const accountTypes = ["Personal", "Organization"]
  var result = accountTypes.find(type => type === value);
  if(result === undefined || result === null) {
    throw new Error('Type field only includes [Personal] or [Organization]');
  }
}

const accountValidateSchema = checkSchema({
  Email: {
    isEmail: {
      errorMessage: "Invalid email format",
    },
    custom: {
      options: checkIfEmailExists
    },
  },
  Type: {
    notEmpty: {
      errorMessage: "Type is required"
    },
    custom: {
      options: isValidAccountType
    },
  },
  Password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    }
  },
});


module.exports = {
    accountValidateSchema
}