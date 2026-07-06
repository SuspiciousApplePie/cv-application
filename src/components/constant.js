const formHeader = {
  GENERAL: "General Information",
  EDUC: "Educational Experience",
  PRAC: "Practical Experience",
};

const wrapper = {
  GENERAL: "general-wrapper",
  EDUC_WRAPPER: "educ-wrapper",
  PRACTICAL: "practical-wrapper",
  FORM_CONTROL: "form-control",
  BTN_CONTROL: "btn-control",
  JOB_WRAPPER: "job-res-wrapper",
  FORM_WRAPPER: "form-wrapper",
  CV_WRAPPER: "cv-wrapper",
  PAPER: "paper",
  ERR_MSG: "error-message",
};

const button = {
  DRAWER: "drawer-btn",
};

const educLevel = {
  SELECT: "",
  PRIMARY: "Primary",
  MIDDLE: "Middle",
  HIGH_SCHOOL: "High School",
  BACHELOR: "Bachelor",
};

const regExp = {
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  CONTACT: /^\+?[0-9]\d{7,14}$/,
};

export { formHeader, wrapper, educLevel, regExp, button };
