import { formHeader, wrapper, educLevel } from "./constant.js";
import { validateEducationForm } from "./validation.js";
import { format, parse } from "date-fns";
import "./Education.css";
import "./global.css";
import { useState } from "react";

function EducationExp(
  schoolName = "",
  level = "",
  startDate = "",
  endDate = "",
) {
  return { id: crypto.randomUUID(), schoolName, level, startDate, endDate };
}

function Education({
  setEducInfo,
  educInfo,
  isEditable,
  setIsEditable,
  setDisplayedEducExp,
}) {
  const setNewEducInfo = (e) => {
    e.preventDefault();
    const newEducInfo = [...educInfo, EducationExp()];
    setEducInfo(newEducInfo);
  };

  const [hasSubmit, setHasSubmit] = useState(false);

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
            isEditable={isEditable}
            hasSubmit={hasSubmit}
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

  const editEducationForm = () => setIsEditable(true);
  const saveEducationForm = () => {
    const isValid = educInfo.every(
      (item) => Object.keys(validateEducationForm(item)).length === 0,
    );

    if (!isValid) {
      setHasSubmit(true);
      return;
    }
    if (hasSubmit) {
      setHasSubmit(false);
    }
    setIsEditable(false);
    setDisplayedEducExp(educInfo);
  };

  return (
    <div className={wrapper.EDUC_WRAPPER}>
      <h2>{formHeader.EDUC}</h2>
      <form
        action=""
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          saveEducationForm();
        }}
        noValidate
      >
        {renderEducInfo()}
        <div className={wrapper.BTN_CONTROL}>
          {!isEditable && (
            <button type="button" onClick={editEducationForm}>
              Edit
            </button>
          )}
          {isEditable && (
            <button type="button" onClick={setNewEducInfo}>
              Add
            </button>
          )}
          {isEditable && <button type="submit">Save</button>}
        </div>
      </form>
    </div>
  );
}

function EducationForm({
  educInfo,
  editSchoolName,
  editSchoolLevel,
  editStartDate,
  editEndDate,
  deleteEducInfo,
  isEditable,
  hasSubmit,
}) {
  const educInfoError = validateEducationForm(educInfo);
  const [touched, setTouched] = useState({});
  return (
    <>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`school: ${educInfo.id}`}>School Name</label>
        <input
          type="text"
          name="school"
          id={`school: ${educInfo.id}`}
          value={educInfo.schoolName}
          onChange={(e) => {
            if (!touched.schoolNameInput) {
              setTouched({ ...touched, schoolNameInput: true });
            }
            editSchoolName(e.target.value, educInfo.id);
          }}
          required
          readOnly={!isEditable}
        />
        {(touched.schoolNameInput && educInfoError.schoolName && (
          <span className={wrapper.ERR_MSG}>{educInfoError.schoolName}</span>
        )) ||
          (hasSubmit && educInfoError.schoolName && (
            <span className={wrapper.ERR_MSG}>{educInfoError.schoolName}</span>
          ))}
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`level-${educInfo.id}`}>Level</label>
        <select
          name="level"
          id={`level-${educInfo.id}`}
          onChange={(e) => {
            if (!touched.educLevel) {
              setTouched({ ...touched, educLevel: true });
            }
            editSchoolLevel(e.target.value, educInfo.id);
          }}
          value={educInfo.level}
          required
          disabled={!isEditable}
        >
          <option value={educLevel.SELECT}>--select--</option>
          <option value={educLevel.PRIMARY}>Primary</option>
          <option value={educLevel.MIDDLE}>Middle</option>
          <option value={educLevel.HIGH_SCHOOL}>High School</option>
          <option value={educLevel.BACHELOR}>Bachelor</option>
        </select>
        {(touched.educLevel && educInfoError.educLevel && (
          <span className={wrapper.ERR_MSG}>{educInfoError.educLevel}</span>
        )) ||
          (hasSubmit && educInfoError.educLevel && (
            <span className={wrapper.ERR_MSG}>{educInfoError.educLevel}</span>
          ))}
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
            if (!touched.startDate) {
              setTouched({ ...touched, startDate: true });
            }
            editStartDate(e.target.value, educInfo.id);
          }}
          required
          readOnly={!isEditable}
        />
        {(touched.startDate && educInfoError.startDate && (
          <span className={wrapper.ERR_MSG}>{educInfoError.startDate}</span>
        )) ||
          (hasSubmit && educInfoError.startDate && (
            <span className={wrapper.ERR_MSG}>{educInfoError.startDate}</span>
          ))}

        <label htmlFor={`end-${educInfo.id}`}>End</label>
        <input
          type="month"
          name="end-date"
          id={`end-${educInfo.id}`}
          value={
            educInfo.endDate !== "" ? format(educInfo.endDate, "yyyy-MM") : ""
          }
          onChange={(e) => {
            if (!touched.endDate) {
              setTouched({ ...touched, endDate: true });
            }
            editEndDate(e.target.value, educInfo.id);
          }}
          required
          readOnly={!isEditable}
        />
        {(touched.endDate && educInfoError.endDate && (
          <span className={wrapper.ERR_MSG}>{educInfoError.endDate}</span>
        )) ||
          (hasSubmit && educInfoError.endDate && (
            <span className={wrapper.ERR_MSG}>{educInfoError.endDate}</span>
          ))}
      </div>
      {isEditable && (
        <div className={wrapper.BTN_CONTROL}>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteEducInfo(educInfo.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export { Education };
