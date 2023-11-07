import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Player from "./player/Player";
const TextToSpeech = () => {
  const [textInput, setTextInput] = useState("");
  const [langInput, setLangInput] = useState("en");
  const [voiceInput, setVoiceInput] = useState(0);
  const [voices, setVoices] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (voices.length < 1) {
      setVoices(getVoices());
    }
  });
  function sendRequest(e) {
    e.preventDefault();
    // console.log(numberInput, langInput);
    const url = "http://127.0.0.1:8000/api/utility/api/v1/text-to-speech/";
    const data = {
      text: textInput,
      lang: langInput,
    };

    axios
      .post(url, data)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        setResult(response.data.text);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  function getVoices() {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      // some time the voice will not be initialized so we can call speak with empty string
      // this will initialize the voices
      let utterance = new SpeechSynthesisUtterance("");
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }
  function speak(e) {
    e.preventDefault();
    // create a SpeechSynthesisUtterance to configure the how text to be spoken
    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = 1; // From 0 to 1
    speakData.rate = 1; // From 0.1 to 10
    speakData.pitch = 2; // From 0 to 2
    speakData.text = textInput;
    // speakData.lang = langInput;
    speakData.voice = voices[voiceInput];

    // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
    speechSynthesis.speak(speakData);
  }
  return (
    <>
      <h4 className="m-3">Text To Speech</h4>
      <form onSubmit={speak}>
        <div className="row">
          <div className="form-group row mb-3">
            <label className="col-sm-4 col-form-label" htmlFor="textInput">
              Text
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="textInput"
                name="text"
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="form-group row mb-3">
            <div className="col-sm-4">
              <label htmlFor="language" className="form-label">
                Language
              </label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="language"
                required=""
                onChange={(e) => setLangInput(e.target.value)}
                defaultValue={"en"}
              >
                <option value="">Choose...</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
                <option value="fi">Finn</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
          </div> */}
          <div className="form-group row mb-3">
            <div className="col-sm-4">
              <label htmlFor="voices" className="form-label">
                Voices
              </label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="voices"
                required=""
                onChange={(e) => setVoiceInput(e.target.value)}
                defaultValue={"en"}
              >
                {voices &&
                  voices.map((voice, index) => {
                    return <option key={index} value={index}>{voice.name}</option>;
                  })}
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
          </div>
          <div className="form-group row mb-3">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <button className="btn btn-primary w-100" type="submit">
                submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row my-5">
        <p className="font-weight-bold">{result}</p>
        {result && <Player url={""} />}
      </div>
    </>
  );
};

export default TextToSpeech;
