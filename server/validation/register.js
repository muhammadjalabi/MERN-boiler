const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  let { email, password } = data;

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";


  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Enter a valid email id";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};