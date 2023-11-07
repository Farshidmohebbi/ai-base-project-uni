import React from "react";
import { useState } from "react";
import axios from "axios";

const PhotoToNum = () => {
  const [fileInput, setFileInput] = useState(null);
  const [result, setResult] = useState("");

  function sendRequest(e) {
    e.preventDefault();
    // console.log(numberInput, langInput);
    const url = "http://127.0.0.1:8000/api/utility/api/v1/predict-number/";
    const formData = new FormData();
    formData.append("image", fileInput);

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
        setResult(`${response.data.text} , acc=${response.data.accuracy} `);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  return (
    <>
      <h4 className="m-3">Photo To Number</h4>
      <form onSubmit={sendRequest}>
        <div className="row">
          <div className="form-group row mb-3">
            <label className="col-sm-4 col-form-label" htmlFor="imageInput">
              Picture
            </label>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                id="imageInput"
                name="image"
                accept="image/*"
                onChange={(e) => setFileInput(e.target.files[0])}
              />
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

export default PhotoToNum;
