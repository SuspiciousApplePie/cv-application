import { useState } from "react";
import { General } from "./components/General.jsx";
import { Education } from "./components/Education.jsx";
import "./App.css";

function App() {
  return <Main />;
}

function Main() {
  return (
    <main>
      <General />
      <Education />
    </main>
  );
}
export default App;
