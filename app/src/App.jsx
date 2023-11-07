import { useState } from "react";
import "./App.css";
import NumToText from "./components/utilities/NumToText";
import TranslateText from "./components/utilities/TranslateText";
import TextToSpeech from "./components/utilities/TextToSpeech";
import PhotoToNum from "./components/utilities/PhotoToNum";
function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <NumToText />
          </div>
          <div className="col-md-6 ">
            <TranslateText />
          </div>
          <div className="col-md-6 ">
            <TextToSpeech />
          </div>
          <div className="col-md-6 ">
            <PhotoToNum />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
