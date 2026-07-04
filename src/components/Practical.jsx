import { wrapper, formHeader } from "./constant.js";
import { format, parse } from "date-fns";
import { validatePracticalForm } from "./validation.js";
import { useState } from "react";
import "./Practical.css";
import "./global.css";

function PracticalExp(
  companyName = "",
  positionTitle = "",
  jobResponsibility = [],
  startDate = "",
  endDate = "",
) {
  return {
    id: crypto.randomUUID(),
    companyName,
    positionTitle,
    jobResponsibility,
    startDate,
    endDate,
  };
}

function JobResponsibility(jobDesc = "") {
  return { id: crypto.randomUUID(), jobDesc };
}

function Practical({
  practicalExp,
  setPracticalExp,
  isEditable,
  setIsEditable,
  setDisplayedPracExp,
}) {
  const [hasSubmit, setHasSubmit] = useState(false);
  function addPracticalExp() {
    const newPracticalExp = [...practicalExp, PracticalExp()];
    setPracticalExp(newPracticalExp);
  }

  function deletePracticalExp(practicalExpId) {
    const newPracticalExp = practicalExp.filter(
      (practicalExpItem) => practicalExpItem.id !== practicalExpId,
    );
    setPracticalExp(newPracticalExp);
  }

  function editCompanyName(newCompanyName, id) {
    const updatedCompanyName = practicalExp.map((practicalExpItem) => {
      return practicalExpItem.id === id
        ? { ...practicalExpItem, companyName: newCompanyName }
        : practicalExpItem;
    });

    setPracticalExp(updatedCompanyName);
  }

  function editPositionTitle(newPositionTitle, id) {
    const updatedPositionedTitle = practicalExp.map((practicalExpItem) => {
      return practicalExpItem.id === id
        ? { ...practicalExpItem, positionTitle: newPositionTitle }
        : practicalExpItem;
    });

    setPracticalExp(updatedPositionedTitle);
  }

  function addJobResponsibilities(practicalExpItem) {
    const newJob = practicalExp.map((item) => {
      return item.id === practicalExpItem.id
        ? {
            ...item,
            jobResponsibility: [...item.jobResponsibility, JobResponsibility()],
          }
        : item;
    });

    setPracticalExp(newJob);
  }

  function deleteJobResponsibilities(practicalExpId, jobResponsibilityId) {
    const newJob = practicalExp.map((practicalExpItem) => {
      if (practicalExpId === practicalExpItem.id) {
        const newJobResponsibility = practicalExpItem.jobResponsibility.filter(
          (job) => job.id !== jobResponsibilityId,
        );
        return {
          ...practicalExpItem,
          jobResponsibility: newJobResponsibility,
        };
      } else {
        return practicalExpItem;
      }
    });
    setPracticalExp(newJob);
  }

  function editJobResponsibilities(
    practicalExpId,
    jobResponsibilityId,
    newJobDescription,
  ) {
    const newJob = practicalExp.map((practicalExpItem) => {
      if (practicalExpItem.id === practicalExpId) {
        const newJobResponsibility = practicalExpItem.jobResponsibility.map(
          (job) => {
            return job.id === jobResponsibilityId
              ? { ...job, jobDesc: newJobDescription }
              : job;
          },
        );
        return { ...practicalExpItem, jobResponsibility: newJobResponsibility };
      } else {
        return practicalExpItem;
      }
    });
    setPracticalExp(newJob);
  }

  function editStartDate(newStartDate, id) {
    const updatedStartDate = practicalExp.map((practicalExpItem) => {
      if (practicalExpItem.id === id) {
        return newStartDate !== ""
          ? {
              ...practicalExpItem,
              startDate: parse(newStartDate, "yyyy-MM", new Date()),
            }
          : { ...practicalExpItem, startDate: "" };
      } else {
        return practicalExpItem;
      }
    });

    setPracticalExp(updatedStartDate);
  }

  function editEndDate(newEndDate, id) {
    const updatedEndDate = practicalExp.map((practicalExpItem) => {
      if (practicalExpItem.id === id) {
        return newEndDate !== ""
          ? {
              ...practicalExpItem,
              endDate: parse(newEndDate, "yyyy-MM", new Date()),
            }
          : { ...practicalExpItem, endDate: "" };
      } else {
        return practicalExpItem;
      }
    });
    setPracticalExp(updatedEndDate);
  }

  function renderPracticalExp() {
    if (practicalExp.length) {
      return practicalExp.map((practicalExpItem) => {
        return (
          <PracticalForm
            key={practicalExpItem.id}
            practicalExp={practicalExpItem}
            editCompanyName={editCompanyName}
            editPositionTitle={editPositionTitle}
            renderJobResponsibilities={renderJobResponsibilities}
            addJobResponsibilities={addJobResponsibilities}
            editStartDate={editStartDate}
            editEndDate={editEndDate}
            deletePracticalExp={deletePracticalExp}
            isEditable={isEditable}
            hasSubmit={hasSubmit}
          />
        );
      });
    } else {
      return <p>No Practical Experience.</p>;
    }
  }

  function renderJobResponsibilities(practicalExpItem) {
    if (practicalExpItem.jobResponsibility.length) {
      return practicalExpItem.jobResponsibility.map((job) => {
        return (
          <JobResponsibilities
            key={job.id}
            practicalExpId={practicalExpItem.id}
            job={job}
            deleteJobResponsibilities={deleteJobResponsibilities}
            editJobResponsibilities={editJobResponsibilities}
            isEditable={isEditable}
          />
        );
      });
    } else {
      return <p>No Job Responsibilities listed</p>;
    }
  }

  function savePracticalForm() {
    const isValid = practicalExp.every(
      (item) => Object.keys(validatePracticalForm(item)).length === 0,
    );

    if (!isValid) {
      if (!hasSubmit) setHasSubmit(true);
      return;
    }
    const trimmedPractical = practicalExp.map((item) => {
      if (item.companyName !== item.companyName.trim())
        item.companyName = item.companyName.trim();
      if (item.positionTitle !== item.companyName.trim())
        item.positionTitle = item.positionTitle.trim();
      return item;
    });

    setPracticalExp([...trimmedPractical]);
    setIsEditable(false);
    if (hasSubmit) setHasSubmit(false);
    setDisplayedPracExp([...trimmedPractical]);
  }

  function editPracticalForm() {
    setIsEditable(true);
  }

  return (
    <div className={wrapper.PRACTICAL}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savePracticalForm();
        }}
        noValidate
      >
        <h2>{formHeader.PRAC}</h2>
        {renderPracticalExp()}
        <div className={wrapper.BTN_CONTROL}>
          {!isEditable && (
            <button type="button" onClick={editPracticalForm}>
              Edit
            </button>
          )}
          {isEditable && (
            <button type="button" onClick={addPracticalExp}>
              Add
            </button>
          )}
          {isEditable && <button type="submit">Save</button>}
        </div>
      </form>
    </div>
  );
}

function PracticalForm({
  practicalExp,
  editCompanyName,
  editPositionTitle,
  renderJobResponsibilities,
  addJobResponsibilities,
  editStartDate,
  editEndDate,
  deletePracticalExp,
  isEditable,
  hasSubmit,
}) {
  const errors = validatePracticalForm(practicalExp);
  const [changed, setChanged] = useState({});

  return (
    <>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`com-name-${practicalExp.id}`}>Company Name</label>
        <input
          type="text"
          name=""
          id={`com-name-${practicalExp.id}`}
          value={practicalExp.companyName}
          onChange={(e) => {
            setChanged({ ...changed, companyName: true });
            editCompanyName(e.target.value, practicalExp.id);
          }}
          readOnly={!isEditable}
          required
        />
        {(changed.companyName && errors.companyName && (
          <span className={wrapper.ERR_MSG}>{errors.companyName}</span>
        )) ||
          (hasSubmit && errors.companyName && (
            <span className={wrapper.ERR_MSG}>{errors.companyName}</span>
          ))}
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`pos-title-${practicalExp.id}`}>Position Title</label>
        <input
          type="text"
          name=""
          id={`pos-title-${practicalExp.id}`}
          value={practicalExp.positionTitle}
          onChange={(e) => {
            setChanged({ ...changed, positionTitle: true });
            editPositionTitle(e.target.value, practicalExp.id);
          }}
          readOnly={!isEditable}
          required
        />
        {(changed.positionTitle && errors.positionTitle && (
          <span className={wrapper.ERR_MSG}>{errors.positionTitle}</span>
        )) ||
          (hasSubmit && errors.positionTitle && (
            <span className={wrapper.ERR_MSG}>{errors.positionTitle}</span>
          ))}
      </div>
      {isEditable && (
        <div className={`${wrapper.BTN_CONTROL} job-res`}>
          <span>Job Responsibilities</span>
          <button
            type="button"
            onClick={() => {
              addJobResponsibilities(practicalExp);
            }}
          >
            Add
          </button>
        </div>
      )}
      {renderJobResponsibilities(practicalExp)}
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`start-${practicalExp.id}`}>Start</label>
        <input
          type="month"
          name=""
          id={`end-${practicalExp.id}`}
          value={
            practicalExp.startDate !== ""
              ? format(practicalExp.startDate, "yyyy-MM")
              : ""
          }
          onChange={(e) => {
            editStartDate(e.target.value, practicalExp.id);
          }}
          required
          readOnly={!isEditable}
        />
      </div>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`end-${practicalExp.id}`}>End</label>
        <input
          type="month"
          name=""
          id={`start-${practicalExp.id}`}
          value={
            practicalExp.endDate !== ""
              ? format(practicalExp.endDate, "yyyy-MM")
              : ""
          }
          onChange={(e) => {
            editEndDate(e.target.value, practicalExp.id);
          }}
          required
          readOnly={!isEditable}
        />
      </div>
      {isEditable && (
        <div className={wrapper.BTN_CONTROL}>
          <button
            type="button"
            onClick={() => {
              deletePracticalExp(practicalExp.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}

function JobResponsibilities({
  practicalExpId,
  job,
  deleteJobResponsibilities,
  editJobResponsibilities,
  isEditable,
}) {
  return (
    <div className={wrapper.JOB_WRAPPER}>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`job-res-${job.id}`}>Job Responsibility</label>
        <input
          type="text"
          name=""
          id={`job-res-${job.id}`}
          value={job.jobDesc}
          onChange={(e) => {
            editJobResponsibilities(practicalExpId, job.id, e.target.value);
          }}
          required
          readOnly={!isEditable}
        />
      </div>
      {isEditable && (
        <div className={wrapper.BTN_CONTROL}>
          <button
            type="button"
            onClick={() => {
              deleteJobResponsibilities(practicalExpId, job.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export { Practical };
