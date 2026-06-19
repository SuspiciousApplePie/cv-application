import { useState } from "react";
import { wrapper, formHeader } from "./constant.js";

function PracticalExp(
  companyName = "",
  positionTitle = "",
  jobResponsibility = [],
) {
  return {
    id: crypto.randomUUID(),
    companyName,
    positionTitle,
    jobResponsibility,
  };
}

function JobResponsibility(job = "") {
  return { id: crypto.randomUUID(), job };
}

function Practical() {
  const [practicalExp, setPracticalExp] = useState([]);

  function addPracticalExp() {
    const newPracticalExp = [...practicalExp, PracticalExp()];
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
          />
        );
      });
    } else {
      return <p>No Job Responsibilities listed</p>;
    }
  }

  return (
    <div className={wrapper.PRACTICAL}>
      <h2>{formHeader.PRAC}</h2>
      {renderPracticalExp()}
      <button type="button" onClick={addPracticalExp}>
        Add
      </button>
    </div>
  );
}

function PracticalForm({
  practicalExp,
  editCompanyName,
  editPositionTitle,
  renderJobResponsibilities,
  addJobResponsibilities,
}) {
  return (
    <form action="" method="post">
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`com-name-${practicalExp.id}`}>Company Name</label>
        <input
          type="text"
          name=""
          id={`com-name-${practicalExp.id}`}
          value={practicalExp.companyName}
          onChange={(e) => {
            editCompanyName(e.target.value, practicalExp.id);
          }}
        />
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`pos-title-${practicalExp.id}`}>Position Title</label>
        <input
          type="text"
          name=""
          id={`pos-title-${practicalExp.id}`}
          value={practicalExp.positionTitle}
          onChange={(e) => {
            editPositionTitle(e.target.value, practicalExp.id);
          }}
        />
      </div>
      <div className={wrapper.BTN_CONTROL}>
        <button
          type="button"
          onClick={() => {
            addJobResponsibilities(practicalExp);
          }}
        >
          Add
        </button>
      </div>
      {renderJobResponsibilities(practicalExp)}
    </form>
  );
}

function JobResponsibilities({
  practicalExpId,
  job,
  deleteJobResponsibilities,
}) {
  return (
    <div className={wrapper.JOB_WRAPPER}>
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`job-res-${job.id}`}>Job Responsibilities</label>
        <input type="text" name="" id={`job-res-${job.id}`} />
      </div>
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
    </div>
  );
}

export { Practical };
