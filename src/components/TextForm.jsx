import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [sortOrder] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!","success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!","success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Clear All Text!","success");
  };

  const countSpaces = (text) => {
    return text.split(' ').length - 1;
  };

  const countParagraph = (text) => {
    return text.split("\n").filter(paragraph => paragraph.trim() !== '').length;
  };

  const countNumbers = (text) => {
    return text.replace(/[^0-9]/g, '').length;
  };

  const getNumbers = (text) => {
    return text.replace(/[^0-9]/g, '').split('').join(', ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      props.showAlert("Copy text Successfully","success");
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const handleExtraSpaces = () =>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(' '));
    props.showAlert("Removed Extra Spaces","success");
  }

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  
  const textStyle = {
    backgroundColor:props.mode === "dark" ? "#1e4364c7" : "white",
    color: props.mode === "dark" ? "white" : "black",
  }
  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            value={text}
            onChange={handleOnChange}
            className="form-control"
            id="myBox"
            rows="8"
            style={textStyle}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert To UpperCase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert To LowerCase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>
          Clear Text
        </button>

        <button className="btn btn-primary mx-1" onClick={handleCopy} >
          Copy Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpaces} >
          Remove Extra Spaces
        </button>
      </div>
      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>{text.split(/\s+/).filter(word => word !== '').length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter(word => word !== '').length} minutes to read</p>
        <p>Number of spaces: {countSpaces(text)}</p>
        <p>Number of paragraphs: {countParagraph(text)}</p>
        <p>Number of digits: {countNumbers(text)}</p>
        <p>Digits in text: {getNumbers(text)}</p>
        {sortOrder && <p>Current Sort Order: {sortOrder}</p>}
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
