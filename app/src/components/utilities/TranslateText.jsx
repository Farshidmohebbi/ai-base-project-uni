import React from "react";
import { useState } from "react";
import axios from "axios";

const TranslateText = () => {
  const [textInput, setTextInput] = useState("");
  const [sourceLangInput, setSourceLangInput] = useState("en");
  const [targetLangInput, setTargetLangInput] = useState("fr");
  const [result, setResult] = useState("");

  function sendRequest(e) {
    e.preventDefault();
    // console.log(numberInput, langInput);
    const url = "http://127.0.0.1:8000/api/utility/api/v1/text-translator/";
    const data = {
      text: textInput,
      source_lang: sourceLangInput,
      target_lang: targetLangInput,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((response) => {
        // Handle the response
        // console.log(response.data);
        setResult(response.data.text);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  return (
    <>
      <h4 className="m-3">Text Translator</h4>
      <form onSubmit={sendRequest}>
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

          <div className="form-group row mb-3">
            <div className="col-sm-4">
              <label htmlFor="language" className="form-label">
                Source Language
              </label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="source-language"
                required=""
                onChange={(e) => setSourceLangInput(e.target.value)}
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
                Please provide a valid language.
              </div>
            </div>
          </div>
          <div className="form-group row mb-3">
            <div className="col-sm-4">
              <label htmlFor="target-language" className="form-label">
                Target Language
              </label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="target-language"
                required=""
                onChange={(e) => setTargetLangInput(e.target.value)}
                defaultValue={"fr"}
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
                Please provide a valid language.
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
      </div>
    </>
  );
};

export default TranslateText;
