import { useState } from "react";
import { General } from "./components/General.jsx";
import { Education } from "./components/Education.jsx";
import { Practical } from "./components/Practical.jsx";
import { Display } from "./components/Display.jsx";
import { format } from "date-fns";
import "./App.css";

function App() {
  return <Main />;
}

function Main() {
  const [genInfo, setGenInfo] = useState({
    fname: "",
    lname: "",
    email_add: "",
    contact: "",
  });

  const [isEditableGen, setIsEditableGen] = useState(true);
  const [displayedGenInfo, setDisplayedGenInfo] = useState(null);

  const [educInfo, setEducInfo] = useState([]);
  const [isEditableEduc, setIsEditableEduc] = useState(true);
  const [displayedEducExp, setDisplayedEducExp] = useState([]);

  const [practicalExp, setPracticalExp] = useState([]);
  const [isEditablePrac, setIsEditablePrac] = useState(true);
  const [displayedPracExp, setDisplayedPracExp] = useState([]);

  const renderGeneral = () => {
    if (displayedGenInfo) {
      return (
        <div>
          <h1>General Information</h1>
          <section>
            <h2>
              {displayedGenInfo.fname} {displayedGenInfo.lname}
            </h2>
            <address>Email: {displayedGenInfo.email_add}</address>
            <address>Contact: {displayedGenInfo.contact}</address>
          </section>
        </div>
      );
    }
  };

  const renderEduc = () => {
    if (displayedEducExp.length) {
      return (
        <div>
          <h1>Education Experience</h1>
          <section>
            {displayedEducExp.map((displayedEducItem) => {
              return (
                <div key={displayedEducItem.id}>
                  <h2>{displayedEducItem.schoolName}</h2>
                  <h3>{displayedEducItem.level}</h3>
                  <time>{`${format(displayedEducItem.startDate, "yyyy MMMM")} - ${format(displayedEducItem.endDate, "yyyy MMMM")}`}</time>
                </div>
              );
            })}
          </section>
        </div>
      );
    }
  };

  const renderJobResponsibilities = (jobResponsibilities) => {
    if (jobResponsibilities.length) {
      return (
        <div>
          <h1>Job Responsibilities</h1>
          <ul>
            {jobResponsibilities.map((job) => {
              return <li key={job.id}>{job.jobDesc}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  const renderPrac = () => {
    if (displayedPracExp.length) {
      return (
        <div>
          <h1>Practical Experience</h1>
          <section>
            {displayedPracExp.map((displayedPracItem) => {
              return (
                <div key={displayedPracItem.id}>
                  <h2>{displayedPracItem.companyName}</h2>
                  <h3>{displayedPracItem.positionTitle}</h3>
                  {renderJobResponsibilities(
                    displayedPracItem.jobResponsibility,
                  )}

                  <time>{`${format(displayedPracItem.startDate, "yyyy MMMM")} - ${format(displayedPracItem.endDate, "yyyy MMMM")}`}</time>
                </div>
              );
            })}
          </section>
        </div>
      );
    }
  };

  return (
    <main>
      <General
        genInfo={genInfo}
        setGenInfo={setGenInfo}
        isEditable={isEditableGen}
        setIsEditable={setIsEditableGen}
        setDisplayedGenInfo={setDisplayedGenInfo}
      />
      <Education
        educInfo={educInfo}
        setEducInfo={setEducInfo}
        isEditable={isEditableEduc}
        setIsEditable={setIsEditableEduc}
        setDisplayedEducExp={setDisplayedEducExp}
      />
      <Practical
        practicalExp={practicalExp}
        setPracticalExp={setPracticalExp}
        isEditable={isEditablePrac}
        setIsEditable={setIsEditablePrac}
        setDisplayedPracExp={setDisplayedPracExp}
      />
      <Display
        renderGeneral={renderGeneral}
        renderEduc={renderEduc}
        renderPrac={renderPrac}
      />
    </main>
  );
}
export default App;
