import { useState } from "react";
import { wrapper, formHeader } from "./constant.js";

function PracticalExp(companyName = "", position = "") {
  return { id: crypto.randomUUID(), companyName, position };
}

function Practical() {
  const [practicalExp, setPracticalExp] = useState([]);

  function addPracticalExp() {
    const newPracticalExp = [...practicalExp, PracticalExp()];
    setPracticalExp(newPracticalExp);
  }

  function renderPracticalExp() {
    if (practicalExp.length) {
      return practicalExp.map((practicalExpItem) => {
        return (
          <PracticalForm
            key={practicalExpItem.id}
            practicalExp={practicalExpItem}
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

function PracticalForm({ practicalExp }) {
  return (
    <form action="" method="post">
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`com-name-${practicalExp.id}`}>Company Name</label>
        <input
          type="text"
          name=""
          id={`com-name-${practicalExp.id}`}
          value={practicalExp.companyName}
        />
      </div>

      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`pos-title-${practicalExp.id}`}>Position Title</label>
        <input
          type="text"
          name=""
          id={`pos-title-${practicalExp.id}`}
          value={practicalExp.position}
        />
      </div>
    </form>
  );
}

export { Practical };
