import { useState } from "react";
import { formHeader, wrapper, educLevel } from "./constant.js";
import { format, parse } from "date-fns";

function EducationExp(
  schoolName = "",
  level = "",
  startDate = "",
  endDate = "",
) {
  return { id: crypto.randomUUID(), schoolName, level, startDate, endDate };
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
            editSchoolName={editSchoolName}
            editSchoolLevel={editSchoolLevel}
            editStartDate={editStartDate}
            editEndDate={editEndDate}
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

  const editSchoolName = (newSchoolName, id) => {
    const updatedSchoolName = educInfo.map((educItem) => {
      return educItem.id === id
        ? { ...educItem, schoolName: newSchoolName }
        : educItem;
    });
    setEducInfo(updatedSchoolName);
  };

  const editSchoolLevel = (newSchoolLevel, id) => {
    if (!Object.values(educLevel).includes(newSchoolLevel))
      throw new Error("Invalid School Level");

    const updatedSchoolLevel = educInfo.map((educItem) => {
      return educItem.id === id
        ? { ...educItem, level: newSchoolLevel }
        : educItem;
    });

    setEducInfo(updatedSchoolLevel);
  };

  const editStartDate = (newStartDate, id) => {
    const updatedStartDate = educInfo.map((educItem) => {
      if (educItem.id === id) {
        return newStartDate !== ""
          ? {
              ...educItem,
              startDate: parse(newStartDate, "yyyy-MM", new Date()),
            }
          : { ...educItem, startDate: "" };
      } else {
        return educItem;
      }
    });
    setEducInfo(updatedStartDate);
  };

  const editEndDate = (newEndDate, id) => {
    const updatedEndDate = educInfo.map((educItem) => {
      if (educItem.id === id) {
        return newEndDate !== ""
          ? {
              ...educItem,
              endDate: parse(newEndDate, "yyyy-MM", new Date()),
            }
          : { ...educItem, endDate: "" };
      } else {
        return educItem;
      }
    });
    setEducInfo(updatedEndDate);
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

function EducationForm({
  educInfo,
  editSchoolName,
  editSchoolLevel,
  editStartDate,
  editEndDate,
  deleteEducInfo,
}) {
  return (
    <form method="post">
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`school: ${educInfo.id}`}>School Name</label>
        <input
          type="text"
          name="school"
          id={`school: ${educInfo.id}`}
          value={educInfo.schoolName}
          onChange={(e) => {
            editSchoolName(e.target.value, educInfo.id);
          }}
          required
        />
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`level-${educInfo.id}`}>Level</label>
        <select
          name="level"
          id={`level-${educInfo.id}`}
          onChange={(e) => {
            editSchoolLevel(e.target.value, educInfo.id);
          }}
          value={educInfo.level}
          required
        >
          <option value={educLevel.SELECT}>--select--</option>
          <option value={educLevel.PRIMARY}>Primary</option>
          <option value={educLevel.MIDDLE}>Middle</option>
          <option value={educLevel.HIGH_SCHOOL}>High School</option>
          <option value={educLevel.BACHELOR}>Bachelor</option>
        </select>
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`start-${educInfo.id}`}>Start</label>
        <input
          type="month"
          name="start-date"
          id={`start-${educInfo.id}`}
          value={
            educInfo.startDate !== ""
              ? format(educInfo.startDate, "yyyy-MM")
              : ""
          }
          onChange={(e) => {
            editStartDate(e.target.value, educInfo.id);
          }}
          required
        />
        <label htmlFor={`end-${educInfo.id}`}>End</label>
        <input
          type="month"
          name="end-date"
          id={`end-${educInfo.id}`}
          value={
            educInfo.endDate !== "" ? format(educInfo.endDate, "yyyy-MM") : ""
          }
          onChange={(e) => {
            editEndDate(e.target.value, educInfo.id);
          }}
          required
        />
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
