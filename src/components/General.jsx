import { formHeader, wrapper } from "./constant.js";
import { validateGeneralForm } from "./validation.js";
import { useState } from "react";
import "./General.css";
import "./global.css";

function General({
  genInfo,
  setGenInfo,
  isEditable,
  setIsEditable,
  setDisplayedGenInfo,
}) {
  const [changed, setChange] = useState({});
  const [hasSubmit, setHasSubmit] = useState(false);
  const formData = {
    FNAME: "fname",
    LNAME: "lname",
    EMAIL_ADDRESS: "email-address",
    CONTACT: "contact",
  };

  const formType = {
    TEXT: "text",
    TEL: "tel",
    EMAIL: "email",
  };

  function setNewFirstName(e) {
    setChange({ ...changed, fname: true });
    const newFirst = { ...genInfo, fname: e.target.value };
    setGenInfo(newFirst);
  }

  function setNewLastName(e) {
    setChange({ ...changed, lname: true });
    const newLast = { ...genInfo, lname: e.target.value };
    setGenInfo(newLast);
  }

  function setNewEmail(e) {
    setChange({ ...changed, email: true });
    const newEmail = { ...genInfo, email_add: e.target.value };
    setGenInfo(newEmail);
  }

  function setNewContact(e) {
    const newContact = { ...genInfo, contact: e.target.value };
    setGenInfo(newContact);
  }

  function saveGeneralInformation(e) {
    e.preventDefault();
    const isValid = Object.keys(genErrors).length === 0;
    if (!isValid) {
      setHasSubmit(true);
      return;
    }
    if (hasSubmit) {
      setHasSubmit(false);
    }
    setGenInfo({
      ...genInfo,
      fname: genInfo.fname.trim(),
      lname: genInfo.lname.trim(),
      email_add: genInfo.email_add.trim(),
    });
    setIsEditable(false);
    setDisplayedGenInfo(genInfo);
  }

  const editGeneralInformation = () => setIsEditable(true);
  const genErrors = validateGeneralForm(genInfo);
  return (
    <div className={wrapper.GENERAL}>
      <h2>{formHeader.GENERAL}</h2>
      <form
        action=""
        method="post"
        onSubmit={saveGeneralInformation}
        noValidate
      >
        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.FNAME}>First Name</label>
          <input
            type={formType.TEXT}
            name={formData.FNAME}
            id={formData.FNAME}
            value={genInfo.fname}
            onChange={setNewFirstName}
            required={true}
            readOnly={!isEditable}
          />
          {(changed.fname && genErrors.fname && (
            <span className={wrapper.ERR_MSG}>{genErrors.fname}</span>
          )) ||
            (hasSubmit && genErrors.fname && (
              <span className={wrapper.ERR_MSG}>{genErrors.fname}</span>
            ))}
        </div>

        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.LNAME}>Last Name</label>
          <input
            type={formType.TEXT}
            name={formData.LNAME}
            id={formData.LNAME}
            value={genInfo.lname}
            onChange={setNewLastName}
            required={true}
            readOnly={!isEditable}
          />
          {(changed.lname && genErrors.lname && (
            <span className={wrapper.ERR_MSG}>{genErrors.lname}</span>
          )) ||
            (hasSubmit && genErrors.lname && (
              <span className={wrapper.ERR_MSG}>{genErrors.lname}</span>
            ))}
        </div>

        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.EMAIL_ADDRESS}>Email</label>
          <input
            type={formType.TEXT}
            name={formData.EMAIL_ADDRESS}
            inputMode={formType.EMAIL}
            autoComplete={formType.EMAIL}
            id={formData.EMAIL_ADDRESS}
            value={genInfo.email_add}
            onChange={setNewEmail}
            required={true}
            readOnly={!isEditable}
          />
          {(changed.email && genErrors.email && (
            <span className={wrapper.ERR_MSG}>{genErrors.email}</span>
          )) ||
            (hasSubmit && genErrors.email && (
              <span className={wrapper.ERR_MSG}>{genErrors.email}</span>
            ))}
        </div>

        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.CONTACT}>Contact</label>
          <input
            type={formType.TEL}
            name={formData.CONTACT}
            id={formData.CONTACT}
            value={genInfo.contact}
            onChange={setNewContact}
            required={true}
            readOnly={!isEditable}
          />
        </div>

        <div className={wrapper.BTN_CONTROL}>
          {!isEditable && (
            <button type="button" onClick={editGeneralInformation}>
              Edit
            </button>
          )}
          {isEditable && <button type="submit">Save</button>}
        </div>
      </form>
    </div>
  );
}

export { General };
