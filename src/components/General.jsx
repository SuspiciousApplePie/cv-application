import { formHeader, wrapper } from "./constant.js";
import { useState } from "react";

function General() {
  const [genInfo, setGenInfo] = useState({
    fname: "",
    lname: "",
    email_add: "",
    contact: "",
  });

  const [isEditable, setIsEditable] = useState(true);

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
    const newFirst = { ...genInfo, fname: e.target.value };
    setGenInfo(newFirst);
  }

  function setNewLastName(e) {
    const newLast = { ...genInfo, lname: e.target.value };
    setGenInfo(newLast);
  }

  function setNewEmail(e) {
    const newEmail = { ...genInfo, email_add: e.target.value };
    setGenInfo(newEmail);
  }

  function setNewContact(e) {
    const newContact = { ...genInfo, contact: e.target.value };
    setGenInfo(newContact);
  }

  function saveGeneralInformation(e) {
    e.preventDefault();
    setIsEditable(false);
  }

  const editGeneralInformation = () => setIsEditable(true);

  return (
    <div className={wrapper.GENERAL}>
      <h2>{formHeader.GENERAL}</h2>
      <form action="" method="post" onSubmit={saveGeneralInformation}>
        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.FNAME}>First Name</label>
          <input
            type={formType.TEXT}
            name={formData.FNAME}
            id={formData.FNAME}
            value={genInfo.fname}
            onChange={setNewFirstName}
            required={true}
          />
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
          />
        </div>

        <div className={wrapper.FORM_CONTROL}>
          <label htmlFor={formData.EMAIL_ADDRESS}>Email</label>
          <input
            type={formType.EMAIL}
            name={formData.EMAIL_ADDRESS}
            id={formData.EMAIL_ADDRESS}
            value={genInfo.email_add}
            onChange={setNewEmail}
            required={true}
          />
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
