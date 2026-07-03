import { isAfter } from "date-fns";

function validateName(type, name) {
  if (name.length === 0) {
    return `${type} is required`;
  } else if (name.length > 52) {
    return `${type} is too long`;
  } else if (name.length < 2) {
    return `${type} is too short`;
  }
}

function requiredField(value, errMsg) {
  if (value === "") return errMsg;
}

function validateEndDate(start, end) {
  if (end === "") return "End date is required";
  if (isAfter(start, end)) return "Start date must be before End date";
}

function validateEducationForm(educInfo) {
  const errors = {};
  const schoolNameError = validateName("School name", educInfo.schoolName);
  const startDateError = requiredField(
    educInfo.startDate,
    "Start date is required",
  );
  const endDateError = validateEndDate(educInfo.startDate, educInfo.endDate);

  if (schoolNameError) errors.schoolName = schoolNameError;
  if (startDateError) errors.startDate = startDateError;
  if (endDateError) errors.endDate = endDateError;

  return errors;
}
export { validateEducationForm };
