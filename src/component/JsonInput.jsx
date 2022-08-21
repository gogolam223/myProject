import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../assets/style/JsonInput.css";

const placeholder = `Sample JSON:
[
    { "name": "A", "weight": 3, "value": -0.02 },
    { "name": "B", "weight": 3, "value": 0.05 },
    { "name": "C", "weight": 6, "value": 0.015 },
    { "name": "D", "weight": 2, "value": -0.01 },
    { "name": "E", "weight": 3, "value": 0.01 }
]
`;

export default function JsonInput(props) {
  const [textInput, setTextInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");

  useEffect(() => {
    inputValidate();
  }, [textInput]);

  const inputValidate = () => {
    try {
      setIsValid(false);
      if (!textInput) {
        //empty input
        setErrorMsg(" ");
        return;
      }
      // throw SyntaxError if invalid
      const input = JSON.parse(textInput);
      if (input.length === 0) {
        //empty array []
        setErrorMsg("Empty JSON");
        return;
      }
      if (input.length > 50) {
        //too many item
        setErrorMsg("Too many item (Maximum 50)");
        return;
      }
      for (let [index, data] of input.entries()) {
        // data.name must be string and less than 50 characters
        if (
          !data["name"] ||
          typeof data["name"] != "string" ||
          data["name"].length > 49
        ) {
          setErrorMsg(`Invalid name in item ${index + 1}`);
          return;
        }
        // data.weight must be integer
        if (
          !data["weight"] ||
          !Number.isSafeInteger(data["weight"]) ||
          data["weight"] <= 0
        ) {
          setErrorMsg(`Invalid weight in item ${index + 1}`);
          return;
        }
        // data.value
        if (data["value"] == undefined || typeof data["value"] != "number") {
          setErrorMsg(`Invalid value in item ${index + 1}`);
          return;
        }
      }
      setIsValid(true);
      setErrorMsg(" ");
    } catch (err) {
      if (err.name === "SyntaxError") {
        setErrorMsg("Invalid JSON Format");
      } else {
        console.log(err.name);
      }
    }
  };

  const handleUpdateData = () => {
    if (textInput && isValid) {
      props.updateData(JSON.parse(textInput));
    }
  };

  return (
    <div className="json-input">
      <TextField
        label="JSON Input"
        placeholder={placeholder}
        multiline
        fullWidth
        error={!!textInput && !isValid}
        helperText={errorMsg}
        rows={10}
        value={textInput}
        onChange={(event) => {
          setTextInput(event.target.value);
        }}
      />
      <button className={!isValid && "disabled"} onClick={handleUpdateData}>
        Update JSON Data
      </button>
    </div>
  );
}
