import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [operations, setOperations] = useState([]);
  const [result, setResult] = useState("");
  const isOperator = (value) => ["+", "-", "*", "/"].includes(value);

  const handleClick = (value) => {
    if (isOperator(value)) {
      if (currentNumber === "") return; // prevent operator without number
      setOperations((prev) => [...prev, currentNumber, value]);
      setCurrentNumber("");
    } else {
      setCurrentNumber((prev) => prev + value);
    }
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setCurrentNumber("");
    setOperations([]);
    setResult("");
  };

  const calculate = () => {
    let exp = [...operations, currentNumber];
    if (exp.length < 3) return setResult(currentNumber || "0");

    let total = parseFloat(exp[0]);

    for (let i = 1; i < exp.length; i += 2) {
      const operator = exp[i];
      const nextNum = parseFloat(exp[i + 1]);

      if (isNaN(nextNum)) return setResult("Error");

      switch (operator) {
        case "+":
          total += nextNum;
          break;
        case "-":
          total -= nextNum;
          break;
        case "*":
          total *= nextNum;
          break;
        case "/":
          if (nextNum === 0) return setResult("Divide by 0");
          total /= nextNum;
          break;
        default:
          return setResult("Error");
      }
    }

    setResult(total.toString());
  };

  const buttons = [
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
    <div
      className="container mt-5 p-4 border rounded shadow"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-4">React Calculator</h2>

      <input
        type="text"
        value={input}
        className="form-control mb-3 text-end fs-4"
        placeholder="0"
        readOnly
      />

      <div className="row g-2">
        {buttons.map((btn, index) => (
          <div className="col-3" key={index}>
            <button
              className={`btn ${
                btn === "=" ? "btn-success" : "btn-secondary"
              } w-100 fs-4`}
              onClick={btn === "=" ? calculate : () => handleClick(btn)}
            >
              {btn}
            </button>
          </div>
        ))}
        <div className="col-12">
          <button
            className="btn btn-success custom-clear-btn w-100 fs-4 mt-2"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {result !== "" && (
        <div className="alert alert-info mt-4 text-center fs-5">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default Calculator;
