import { useState, useEffect } from "./React";

import { prepareInitTable, solveTable } from "./fetchEndpoint.js";
import { SudokuTable } from "./SudokuTable.jsx";
import { UpperSudokuButtons, LowerSudokuButtons } from "./SudokuButtons.jsx";

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
  const [historyNumberArray, setHistoryNumberArray] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const applyInitTable = async () => {
    const preparedNumberArray = await prepareInitTable(40);
    if (preparedNumberArray) {
      setNumberArray(preparedNumberArray.map((row) => [...row]));
      setInitNumberArray(preparedNumberArray.map((row) => [...row]));
      setHistoryNumberArray([preparedNumberArray.map((row) => [...row])]);
      setHistoryIndex(0);
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
    const newHistoryNumberArray = historyNumberArray.slice(0, historyIndex + 1);
    newHistoryNumberArray.push(updatedNumberArray);
    setHistoryNumberArray(newHistoryNumberArray);
    setHistoryIndex(historyIndex + 1);
  };

  const handleChange = () => {
    applyInitTable();
  };

  const handleReset = () => {
    setNumberArray(initNumberArray.map((row) => [...row]));
    setHistoryNumberArray([initNumberArray.map((row) => [...row])]);
    setHistoryIndex(0);
  };

  const handleSolve = async () => {
    const solvedNumberArray = await solveTable(numberArray);
    if (solvedNumberArray) {
      setNumberArray(solvedNumberArray);
    } else {
      console.error("Failed to solve Sudoku.");
    }
  };

  const handleUndo = () => {
    const newHistoryIndex = historyIndex - 1;
    if (newHistoryIndex >= 0) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
    }
  };

  const handleRedo = () => {
    const newHistoryIndex = historyIndex + 1;
    if (newHistoryIndex < historyNumberArray.length) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="text-center">
          <UpperSudokuButtons handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
          <SudokuTable numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
          <LowerSudokuButtons handleUndo={handleUndo} handleRedo={handleRedo} />
        </div>
      </main>
      <Footer />
    </>
  );
};
