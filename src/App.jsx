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
      return displayedEducExp.map((displayedEducItem) => {
        return (
          <div key={displayedEducItem.id}>
            <h2>{displayedEducItem.schoolName}</h2>
            <h3>{displayedEducItem.level}</h3>
            <time>{`${format(displayedEducItem.startDate, "yyyy MMMM")} - ${format(displayedEducItem.endDate, "yyyy MMMM")}`}</time>
          </div>
        );
      });
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
      <Practical />
      <Display renderGeneral={renderGeneral} renderEduc={renderEduc} />
    </main>
  );
}
export default App;
