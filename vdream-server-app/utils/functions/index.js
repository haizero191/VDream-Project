

/**
 * Check if a value is empty or has no value
 * @param {any} data 
 * @returns 
 */
const isDataEmptyOrNull = (data) => {
    if (data === null || data === undefined || data.trim() === '') {
      return true;
    } else {
      return false;
    }
}



/**
 * Check if an email is valid or not
 * @param {string} email Email address
 * @returns 
 */
const isEmailValid = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    // Check if the email string is empty or has an unreasonable length
    if (email === null || email === undefined || email.trim() === '' || email.length > 320) {
      return false;
    }
  
    // Check if the email format matches the regular expression
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Check for common invalid email patterns
    if (email.toLowerCase().startsWith('.') || email.toLowerCase().endsWith('.') || email.includes('..')) {
      return false;
    }
  
    // Check for excessive special characters in the local part
    const localPart = email.split('@')[0];
    const allowedSpecialChars = `!#$%&'*+/=?^_{|}~-`;
    for (let char of localPart) {
      if (!allowedSpecialChars.includes(char) && !/[a-zA-Z0-9]/.test(char)) {
        return false;
      }
    }
    return true;
}

/**
 * Random Code for verify Email
 * @returns 
 */
const generateVerificationCode = () => {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return code;
};



module.exports = {isDataEmptyOrNull, isEmailValid, generateVerificationCode}