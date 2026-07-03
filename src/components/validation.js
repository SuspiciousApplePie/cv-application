import { isAfter } from "date-fns";
import { regExp } from "./constant";

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

function validateEmail(email) {
  const requiredErr = requiredField(email, "Email is required");
  if (requiredErr) return requiredErr;
  else if (!regExp.EMAIL.test(email))
    return "Invalid email format. Please enter a valid email format (eg. name@example.com";
}

function validateContact(contact) {
  if (contact.length < 7 && contact.length > 0)
    return "Contact number is too short. Contact number must be at least 7 digit long";
  else if (contact.length > 14)
    return "Contact number is too long. Max is 14 digits";
  else if (!regExp.CONTACT.test(contact) && contact.length !== 0)
    return "Please enter a valid contact number";
}

function validateGeneralForm(genInfo) {
  const errors = {};
  const fnameErr = validateName("First name", genInfo.fname.trim());
  const lnameErr = validateName("Last name", genInfo.lname.trim());
  const emailErr = validateEmail(genInfo.email_add.trim());
  const contactErr = validateContact(genInfo.contact.trim());

  if (fnameErr) errors.fname = fnameErr;
  if (lnameErr) errors.lname = lnameErr;
  if (emailErr) errors.email = emailErr;
  if (contactErr) errors.contact = contactErr;

  return errors;
}

function validateEducationForm(educInfo) {
  const errors = {};
  const schoolNameError = validateName("School name", educInfo.schoolName);

  const educLevelError = requiredField(
    educInfo.level,
    "Education level is required",
  );
  const startDateError = requiredField(
    educInfo.startDate,
    "Start date is required",
  );
  const endDateError = validateEndDate(educInfo.startDate, educInfo.endDate);

  if (schoolNameError) errors.schoolName = schoolNameError;
  if (educLevelError) errors.educLevel = educLevelError;
  if (startDateError) errors.startDate = startDateError;
  if (endDateError) errors.endDate = endDateError;

  return errors;
}
export { validateEducationForm, validateGeneralForm };
