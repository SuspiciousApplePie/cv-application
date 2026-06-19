import { useState } from "react";
import { wrapper, formHeader } from "./constant.js";

function PracticalExp(companyName = "", positionTitle = "") {
  return { id: crypto.randomUUID(), companyName, positionTitle };
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

  function renderPracticalExp() {
    if (practicalExp.length) {
      return practicalExp.map((practicalExpItem) => {
        return (
          <PracticalForm
            key={practicalExpItem.id}
            practicalExp={practicalExpItem}
            editCompanyName={editCompanyName}
            editPositionTitle={editPositionTitle}
          />
        );
      });
    } else {
      return <p>No Practical Experience.</p>;
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

function PracticalForm({ practicalExp, editCompanyName, editPositionTitle }) {
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
    </form>
  );
}

export { Practical };
