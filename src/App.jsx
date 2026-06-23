import { useState } from "react";
import { General } from "./components/General.jsx";
import { Education } from "./components/Education.jsx";
import { Practical } from "./components/Practical.jsx";
import { Display } from "./components/Display.jsx";
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

  function setterGenInfo(newValue) {
    setGenInfo(newValue);
  }

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

  return (
    <main>
      <General
        genInfo={genInfo}
        setGenInfo={setGenInfo}
        isEditable={isEditableGen}
        setIsEditable={setIsEditableGen}
        setDisplayedGenInfo={setDisplayedGenInfo}
      />
      <Education />
      <Practical />
      <Display renderGeneral={renderGeneral} />
    </main>
  );
}
export default App;
