import { useState, useEffect } from "./React";

import { prepareInitTable, solveTable } from "./fetchEndpoint.js";
import { SudokuTable } from "./SudokuTable.jsx";
import { SudokuButtons } from "./SudokuButtons.jsx";

/**
 * @returns {JSX.Element}
 */
export const SudokuApp = () => {
  const [numberArray, setNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [initialNumberArray, setInitialNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  const fetchInitialTable = async () => {
    const preparedNumberArray = await prepareInitTable(40);
    if (preparedNumberArray) {
      setNumberArray(preparedNumberArray.map((row) => [...row]));
      setInitialNumberArray(preparedNumberArray.map((row) => [...row]));
    } else {
      console.error("Failed to fetch initial Sudoku table");
    }
  };

  useEffect(() => {
    fetchInitialTable();
  }, []);

  const handleUpdate = (e, i, j) => {
    let value = e.target.value;
    if (initialNumberArray[i][j] !== 0) {
      value = initialNumberArray[i][j];
      return;
    }

    let intValue = parseInt(value);
    if (isNaN(intValue)) {
      value = "";
      intValue = 0;
    } else if (intValue < 1 || intValue > 9) {
      value = "";
      intValue = 0;
    }
    const newNumberArray = numberArray.map((row) => [...row]);
    newNumberArray[i][j] = intValue;
    setNumberArray(newNumberArray);
  };

  const handleChange = () => {
    fetchInitialTable();
  };

  const handleReset = () => {
    setNumberArray(initialNumberArray.map((row) => [...row]));
  };

  const handleSolve = async () => {
    const solvedNumberArray = await solveTable(numberArray);
    if (solvedNumberArray) {
      setNumberArray(solvedNumberArray);
    } else {
      console.error("Failed to solve Sudoku.");
    }
  };

  return (
    <>
      <header>
        <h1 className="text-3xl m-5 text-center">Sudoku App</h1>
      </header>
      <main>
        <div className="text-center">
          <SudokuTable numberArray={numberArray} handleUpdate={handleUpdate} />
          <SudokuButtons handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
        </div>
      </main>
    </>
  );
};
