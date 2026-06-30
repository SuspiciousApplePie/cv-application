import { formLabel } from "./constant";
import { regexPattern } from "./constant";
function checkTextValidity(inputType, textValue) {
  if (textValue.length === 0) return `${inputType} is required`;
  if (textValue.length < 2) {
    return `${inputType} should have a minimum length of 2. (length is currently ${textValue.length})`;
  } else {
    return false;
  }
}

function setNameError(inputType, textValue, formError, setFormError) {
  const validityMessage = checkTextValidity(
    inputType,
    textValue,
    formError,
    setFormError,
  );
  if (validityMessage) {
    if (inputType === formLabel.FIRST_NAME)
      setFormError({ ...formError, fname: validityMessage });
    if (inputType === formLabel.LAST_NAME)
      setFormError({ ...formError, lname: validityMessage });
    return true;
  } else {
    if (inputType === formLabel.FIRST_NAME)
      setFormError({ ...formError, fname: null });
    if (inputType === formLabel.LAST_NAME)
      setFormError({ ...formError, lname: null });
    return false;
  }
}

function validateGeneralForm(genInfo, formError, setFormError) {
  let hasError = false;
  if (
    setNameError(formLabel.FIRST_NAME, genInfo.fname, formError, setFormError)
  )
    hasError = true;
  if (setNameError(formLabel.LAST_NAME, genInfo.lname, formError, setFormError))
    hasError = true;
  if (validateEmail(genInfo.email_add.trim(), formError, setFormError))
    hasError = true;
  return hasError;
}

function validateEmail(email, formError, setFormError) {
  if (email.length === 0) {
    setFormError({ ...formError, email: "Email is required" });
    return true;
  } else if (!regexPattern.EMAIL.test(email)) {
    setFormError({ ...formError, email: "Please enter a valid email address" });
    return true;
  } else {
    setFormError({ ...formError, email: null });
    return false;
  }
}

export { setNameError, validateGeneralForm, validateEmail };
