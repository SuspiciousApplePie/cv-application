function checkTextValidity(inputType, textValue, targetLength) {
  if (textValue.length < targetLength) {
    return `${inputType} should have a minimum length of ${targetLength}. (length is currently ${textValue.length})`;
  } else {
    return false;
  }
}

function setNameError(
  inputType,
  textValue,
  targetLength,
  formError,
  setFormError,
) {
  const validityMessage = checkTextValidity(
    inputType,
    textValue,
    targetLength,
    formError,
    setFormError,
  );
  if (validityMessage) {
    setFormError({ ...formError, fname: validityMessage });
    return true;
  } else {
    setFormError({ ...formError, fname: null });
    return false;
  }
}

export { setNameError };
