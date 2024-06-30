import { useState, useEffect } from "./React";

import { prepareInitTable, solveTable } from "./fetchEndpoint.js";
import { SudokuTable } from "./SudokuTable.jsx";
import { SudokuButtons } from "./SudokuButtons.jsx";

/**
 * @returns {JSX.Element}
 */
export const SudokuApp = () => {
  const [numberArray, setNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [initNumberArray, setInitNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  const applyInitTable = async () => {
    const preparedNumberArray = await prepareInitTable(40);
    if (preparedNumberArray) {
      setNumberArray(preparedNumberArray.map((row) => [...row]));
      setInitNumberArray(preparedNumberArray.map((row) => [...row]));
    } else {
      console.error("Failed to prepare initial Sudoku table");
    }
  };

  useEffect(() => {
    applyInitTable();
  }, []);

  const handleUpdate = (e, i, j) => {
    const intValue = parseInt(e.target.value);
    const updatedNumberArray = numberArray.map((row) => [...row]);
    updatedNumberArray[i][j] = isNaN(intValue) || intValue < 1 || intValue > 9 ? 0 : intValue;
    setNumberArray(updatedNumberArray);
  };

  const handleChange = () => {
    applyInitTable();
  };

  const handleReset = () => {
    setNumberArray(initNumberArray.map((row) => [...row]));
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
          <SudokuTable numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
          <SudokuButtons handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
        </div>
      </main>
    </>
  );
};
