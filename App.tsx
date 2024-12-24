import React from "react";
import TypingTest from "./components/TypingTest";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      <TypingTest />
    </div>
  );
};

export default App;
