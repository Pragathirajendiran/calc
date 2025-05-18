import React, { useState } from "react";
import "./App.css";

const Calc = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (result) {
      setInput(value);
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const calculate = () => {
    try {
      const sanitizedInput = input.replace(/[^0-9+\-*/.]/g, "");
      const evaluatedResult = Function(`return (${sanitizedInput})`)();
      setResult(evaluatedResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const clickButton = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Calculator</h2>
      <input
        type="text"
        value={input}
        readOnly
        className="calculator-display"
        placeholder="0"
      />
      <div className="calculator-button-grid">
        {clickButton.map((btn) => (
          <button
            key={btn}
            className="calculator-button"
            onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
        <button
          className="calculator-button calculator-clear-button"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {result && (
        <div
          style={{ marginTop: "15px", textAlign: "center", fontWeight: "bold" }}
        >
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default Calc;
