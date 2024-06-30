import { useState, useEffect } from "./React";

import { prepareInitTable, solveTable, checkTableCanSolve } from "./fetchEndpoint.js";
import { Toast } from "./Toast.jsx";
import { SudokuTable } from "./SudokuTable.jsx";
import { UpperSudokuButtons, LowerSudokuButtons } from "./SudokuButtons.jsx";

const Header = () => {
  return (
    <header>
      <h1 className="text-3xl font-medium m-5 text-center">Sudoku App</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer class="w-full absolute bottom-1 text-center">
      Created by{" "}
      <a href="https://github.com/TakanariShimbo" class="text-blue-700 hover:underline">
        🌵 Takanari Shimbo
      </a>
      {", "}
      <a href="https://github.com/shun-naganuma" class="text-blue-700 hover:underline">
        🏀 Shun Naganuma
      </a>
      <br />
      Powered by{" "}
      <a href="https://github.com/google/or-tools" class="text-blue-700 hover:underline">
        OR-Tools
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
  const [toastData, setToastData] = useState({ message: "", type: "success" });

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
    setToastData({ message: "The probrem of the puzzle has been changed.", type: "success" });
  };

  const handleReset = () => {
    setNumberArray(initNumberArray.map((row) => [...row]));
    setHistoryNumberArray([initNumberArray.map((row) => [...row])]);
    setHistoryIndex(0);
    setToastData({ message: "Reset successful.", type: "success" });
  };

  const handleSolve = async () => {
    const solvedNumberArray = await solveTable(numberArray);
    if (solvedNumberArray) {
      setNumberArray(solvedNumberArray);
      setToastData({ message: "Solve successful.", type: "success" });
    } else {
      setToastData({ message: "There is a mistake in the numbers entered so far.", type: "danger" });
    }
  };

  const handleUndo = () => {
    const newHistoryIndex = historyIndex - 1;
    if (newHistoryIndex >= 0) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
      setToastData({ message: "Undo successful.", type: "success" });
    } else {
      setToastData({ message: "No more actions to undo.", type: "danger" });
    }
  };

  const handleCheck = async () => {
    const canSolve = await checkTableCanSolve(numberArray);
    if (canSolve) {
      setToastData({ message: "The numbers entered so far are correct.", type: "success" });
    } else {
      setToastData({ message: "There is a mistake in the numbers entered so far.", type: "danger" });
    }
  };

  const handleRedo = () => {
    const newHistoryIndex = historyIndex + 1;
    if (newHistoryIndex < historyNumberArray.length) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
      setToastData({ message: "Redo successful.", type: "success" });
    } else {
      setToastData({ message: "No more actions to redo.", type: "danger" });
    }
  };

  const handleToastClose = () => {
    setToastData({ message: "", type: "success" });
  };

  return (
    <>
      <Toast toastData={toastData} onClose={handleToastClose} />
      <Header />
      <main>
        <div className="text-center">
          <UpperSudokuButtons handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
          <SudokuTable numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
          <LowerSudokuButtons handleUndo={handleUndo} handleCheck={handleCheck} handleRedo={handleRedo} />
        </div>
      </main>
      <Footer />
    </>
  );
};
