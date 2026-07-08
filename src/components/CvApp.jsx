import { Header } from "./Header.jsx";
import { Main } from "./Main.jsx";
import { useState } from "react";

function CvApp() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main darkMode={darkMode} />
    </>
  );
}

export { CvApp };
