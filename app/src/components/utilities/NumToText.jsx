import React from "react";
import { useState } from "react";
import axios from "axios";

const NumToText = () => {
  const [numberInput, setNumberInput] = useState("");
  const [langInput, setLangInput] = useState("en");
  const [result, setResult] = useState("");

  function sendRequest(e) {
    e.preventDefault();
    // console.log(numberInput, langInput);
    const url = "http://127.0.0.1:8000/api/utility/api/v1/number-to-text/";
    const data = {
      number: numberInput,
      lang: langInput,
    };

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
      <h4 className="m-3">Number To Text</h4>
      <form onSubmit={sendRequest}>
        <div className="row">
          <div className="form-group row mb-3">
            <label className="col-sm-4 col-form-label" htmlFor="numberInput">
              Number
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                id="numberInput"
                name="number"
                onChange={(e) => setNumberInput(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row mb-3">
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

export default NumToText;
