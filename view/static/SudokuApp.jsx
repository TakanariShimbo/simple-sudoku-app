import { useState, useEffect } from "./React";

import { prepareInitTable, solveTable } from "./fetchEndpoint.js";
import { SudokuTable } from "./SudokuTable.jsx";
import { SudokuButtons } from "./SudokuButtons.jsx";

const Header = () => {
  return (
    <header>
      <h1 className="text-3xl m-5 text-center">Sudoku App</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer class="w-full absolute bottom-1 text-center">
      Created by{" "}
      <a href="https://github.com/TakanariShimbo" class="text-blue-700">
        🌵 Takanari Shimbo
      </a>
      {", "}
      <a href="https://github.com/shun-naganuma" class="text-blue-700">
        🏀 Shun Naganuma
      </a>
    </footer>
  );
};

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
      <Header />
      <main>
        <div className="text-center">
          <SudokuButtons handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
          <SudokuTable numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
        </div>
      </main>
      <Footer />
    </>
  );
};
