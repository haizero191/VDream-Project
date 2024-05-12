const { checkSchema } = require('express-validator');
const Account = require('../models/Account.model');


const checkIfEmailExists = async (value) => {
  const existingAccount = await Account.findOne({ Email: value });
  if (existingAccount) {
    throw new Error('Email is already in use');
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
  // Password: {
  //   notEmpty: {
  //     errorMessage: "Password is required",
  //   },
  //   isLength: {
  //     options: { min: 8 },
  //     errorMessage: 'Password should be at least 8 chars',
  //   }
  // },
});


const createPasswordSchema = checkSchema({
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
    accountValidateSchema,
    createPasswordSchema
}