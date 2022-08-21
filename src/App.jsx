import React, { useState } from "react";
import "./assets/style/App.css";
import JsonInput from "./component/JsonInput";
import TextField from "@mui/material/TextField";
import Treemap from "./component/Treemap";

export default function App() {
  const [data, setData] = useState([]);
  const [row, setRow] = useState(1);

  const handleUpdateData = (inputData) => {
    // sort by weight desc
    inputData.sort((a, b) => b.weight - a.weight);
    setData(inputData);
    // reset row number
    setRow(1);
  };

  const handleRowInput = (event) => {
    if (event.target.value) {
      var value = parseInt(event.target.value, 10);

      if (value > data.length) value = data.length;
      if (value < 1) value = 1;

      setRow(value);
    } else {
      setRow("");
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <h3>Input</h3>
        <JsonInput updateData={handleUpdateData} />
        {data.length > 0 && (
          <TextField
            label="Row"
            type="number"
            value={row}
            onChange={handleRowInput}
            InputProps={{
              inputProps: {
                max: 50,
                min: 1,
              },
            }}
          />
        )}
      </div>

      <div className="result-container">
        <h3>Result:</h3>
        <Treemap data={data} row={row} />
      </div>
    </div>
  );
}
