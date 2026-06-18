import { formHeader, wrapper } from "./constant.js";
import { useState } from "react";

function General() {
  const [genInfo, setGenInfo] = useState({
    fname: "",
    lname: "",
    email_add: "",
    contact: "",
  });

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
    e.preventDefault();
    const newFirst = { ...genInfo, fname: e.target.value };
    setGenInfo(newFirst);
  }

  function setNewLastName(e) {
    e.preventDefault();
    const newLast = { ...genInfo, lname: e.target.value };
    setGenInfo(newLast);
  }

  function setNewEmail(e) {
    e.preventDefault();
    const newEmail = { ...genInfo, email_add: e.target.value };
    setGenInfo(newEmail);
  }

  function setNewContact(e) {
    e.preventDefault();
    const newContact = { ...genInfo, contact: e.target.value };
    setGenInfo(newContact);
  }

  return (
    <div className={wrapper.GENERAL}>
      <h2>{formHeader.GENERAL}</h2>
      <form action="" method="post">
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
          <button>Edit</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export { General };
