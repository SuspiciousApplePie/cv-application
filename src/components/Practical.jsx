import { useState } from "react";
import { wrapper, formHeader } from "./constant.js";

function PracticalExp(companyName = "") {
  return { id: crypto.randomUUID(), companyName };
}

function Practical() {
  const [practicalExp, setPracticalExp] = useState([]);

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

function PracticalForm(practicalExp) {
  return (
    <form action="" method="post">
      <div className={wrapper.FORM_CONTROL}>
        <label htmlFor={`name-${practicalExp.id}`}>Company Name</label>
        <input
          type="text"
          name=""
          id={`name-${practicalExp.id}`}
          value={practicalExp.companyName}
        />
      </div>
    </form>
  );
}

export { Practical };
