"use client";
import React, { useState, useEffect, useCallback } from "react";
import { BackspaceIcon, ClockIcon } from "@heroicons/react/24/solid";

interface CalculationHistory {
  expression: string;
  result: string;
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 1e-10 || Math.abs(num) > 1e10) {
      return num.toExponential(5);
    }
    return num.toString().slice(0, 12);
  };

  const isValidInput = (currentDisplay: string, newChar: string): boolean => {
    const lastChar = currentDisplay.slice(-1);
    const operators = ["+", "-", "*", "/", "^"];

    if (currentDisplay === "" && operators.includes(newChar)) {
      return false;
    }

    if (operators.includes(lastChar) && operators.includes(newChar)) {
      return false;
    }

    if (lastChar === "." && newChar === ".") {
      return false;
    }

    return true;
  };

  const handleClick = useCallback(
    (value: string) => {
      if (isValidInput(display, value)) {
        if (result !== "") {
          setDisplay(result + value);
          setResult("");
        } else {
          setDisplay(display + value);
        }
      }
    },
    [display, result]
  );

  const handleClear = useCallback(() => {
    setDisplay("");
    setResult("");
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay(display.slice(0, -1));
  }, [display]);

  const handleCalculate = useCallback(() => {
    try {
      // Replace '^' with '**' for exponentiation
      const expression = display.replace(/\^/g, "**");
      const calculatedResult = eval(expression);
      const formattedResult = formatNumber(calculatedResult);
      setResult(formattedResult);
      setHistory((prevHistory) => [...prevHistory, { expression: display, result: formattedResult }]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResult("Error");
    }
  }, [display]);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (/^[0-9+\-*/.=()^]$/.test(key)) {
        event.preventDefault();
        if (key === "=") {
          handleCalculate();
        } else {
          handleClick(key);
        }
      } else if (key === "Enter") {
        event.preventDefault();
        handleCalculate();
      } else if (key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      } else if (key === "Escape") {
        event.preventDefault();
        handleClear();
      }
    },
    [handleClick, handleCalculate, handleBackspace, handleClear]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const buttons = ["(", ")", "^", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=", "C"];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <div className="text-right text-xl text-gray-300 mb-2 min-h-[1.5rem] overflow-x-auto whitespace-nowrap">
          {truncateText(display || "0", 20)}
        </div>
        <div className="text-right text-3xl font-bold text-white overflow-x-auto whitespace-nowrap">
          {truncateText(result || "0", 12)}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") handleCalculate();
              else if (btn === "C") handleClear();
              else handleClick(btn);
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded transition duration-200">
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={handleBackspace}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          <BackspaceIcon className="h-5 w-5 inline-block" />
        </button>
        <button
          onClick={toggleHistory}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          <ClockIcon className="h-5 w-5 inline-block" />
        </button>
      </div>
      {showHistory && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg max-h-60 overflow-y-auto">
          <h3 className="text-white font-bold mb-2">History</h3>
          {history.map((item, index) => (
            <div key={index} className="text-gray-300 truncate">
              {truncateText(item.expression, 15)} = {truncateText(item.result, 12)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;
