function validateName(type, name) {
  if (name.length === 0) {
    return `${type} is required`;
  } else if (name.length > 52) {
    return "School name is too long";
  } else if (name.length < 2) {
    return "School name is too short";
  }
}

function validateEducationForm(educInfo) {
  const errors = {};
  const schoolNameError = validateName("School name", educInfo.schoolName);

  if (schoolNameError) errors.schoolName = schoolNameError;

  return errors;
}
export { validateEducationForm };
