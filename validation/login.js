const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.recaptchaResponse = !isEmpty(data.recaptchaResponse)
  //   ? data.recaptchaResponse
  //   : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // if (Validator.isEmpty(data.recaptchaResponse)) {
  //   errors.recaptchaResponse = "Please select captcha";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
