import { useState } from "react";
import { formHeader, wrapper } from "./constant.js";

function EducationExp(
  level = "",
  schoolName = "",
  startDate = "",
  endDate = "",
) {
  const id = crypto.randomUUID();
  return { id, schoolName, level, startDate, endDate };
}

function Education() {
  const [educInfo, setEducInfo] = useState([]);

  const setNewEducInfo = (e) => {
    e.preventDefault();
    const newEducInfo = [...educInfo, EducationExp()];
    setEducInfo(newEducInfo);
  };

  const renderEducInfo = () => {
    if (educInfo.length) {
      return educInfo.map((educItem) => {
        return (
          <EducationForm
            key={educItem.id}
            educInfo={educItem}
            deleteEducInfo={deleteEducInfo}
          />
        );
      });
    } else {
      return <p>No Education Experience.</p>;
    }
  };

  const deleteEducInfo = (id) => {
    const newEducInfo = educInfo.filter((educItem) => educItem.id !== id);
    setEducInfo(newEducInfo);
  };
  return (
    <>
      <h2>{formHeader.EDUC}</h2>
      {renderEducInfo()}
      <form method="post" className={wrapper.BTN_CONTROL}>
        <button onClick={setNewEducInfo}>Add</button>
      </form>
    </>
  );
}

function EducationForm({ educInfo, deleteEducInfo }) {
  return (
    <form method="post">
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor="school-name">School Name</label>
        <input type="text" name="" id="" />
      </div>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor="">Level</label>
        <select name="level" id="levek">
          <option value="primary">Primary</option>
          <option value="middle">Middle</option>
          <option value="high-school">High School</option>
          <option value="bachelor">Bachelor</option>
        </select>
      </div>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor="">Start</label>
        <input type="date" name="" id="" />
        <label htmlFor="">End</label>
        <input type="date" name="" id="" />
      </div>
      <div className={wrapper.BTN_CONTROL}>
        <button>Edit</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteEducInfo(educInfo.id);
          }}
        >
          Delete
        </button>
        <button>Save</button>
      </div>
    </form>
  );
}

export { Education };
