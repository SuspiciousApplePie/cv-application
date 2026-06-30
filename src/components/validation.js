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
  if (validateContact(genInfo.contact, formError, setFormError))
    hasError = true;
  return hasError;
}

function validateEmail(email, formError, setFormError) {
  if (email.length === 0) {
    setFormError({ ...formError, email: "Email is required" });
    return true;
  } else if (!regexPattern.EMAIL.test(email)) {
    setFormError({
      ...formError,
      email: "Please enter a valid email address. eg: name@example.com",
    });
    return true;
  } else {
    setFormError({ ...formError, email: null });
    return false;
  }
}

function validateContact(contact, formError, setFormError) {
  const cleanedContact = contact.replace(/\s+/g, "").trim();
  if (cleanedContact.length > 0) {
    if (cleanedContact.length < 7) {
      setFormError({
        ...formError,
        contact: `Contact number must be at least 7 characters. (length: ${cleanedContact.length})`,
      });
      return true;
    } else if (cleanedContact.length > 15) {
      setFormError({
        ...formError,
        contact: `Contact number must be at not longer than 15 characters. (length: ${cleanedContact.length})`,
      });
      return true;
    } else if (!regexPattern.CONTACT.test(cleanedContact)) {
      setFormError({
        ...formError,
        contact: "Please enter a valid contact number",
      });
      return true;
    } else {
      setFormError({
        ...formError,
        contact: null,
      });
      return false;
    }
  } else {
    setFormError({
      ...formError,
      contact: null,
    });
    return false;
  }
}

export { setNameError, validateGeneralForm, validateEmail, validateContact };
