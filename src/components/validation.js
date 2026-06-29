import { formLabel } from "./constant";
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
    return true;
  } else {
    setFormError({ ...formError, fname: null });
    return false;
  }
}

function validateGeneralForm(genInfo, formError, setFormError) {
  let hasError = false;
  if (
    setNameError(formLabel.FIRST_NAME, genInfo.fname, formError, setFormError)
  )
    hasError = true;
  return hasError;
}

export { setNameError, validateGeneralForm };
