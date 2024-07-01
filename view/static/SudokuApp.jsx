import { useState, useEffect } from "./React";

import { Toast } from "./Toast.jsx";
import { Texts } from "./Texts.js";
import { prepareInitTable, solveTable, checkTableCanSolve } from "./fetchEndpoint.js";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { SudokuTable } from "./SudokuTable.jsx";
import { UpperSudokuButtons, LowerSudokuButtons } from "./SudokuButtons.jsx";

/**
 * @returns {JSX.Element}
 */
export const SudokuApp = () => {
  /**
   * @typedef {Object} ToastData
   * @property {string} message
   * @property {"success" | "danger" | "warning"} type
   */
  /** @type {[ToastData, Function]} */
  const [toastData, setToastData] = useState({ message: "", type: "success" });

  /** @type {[Texts, Function]} */
  const [texts, setTexts] = useState(new Texts("jp"));

  /** @type {[number[][], Function]} */
  const [numberArray, setNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  /** @type {[number[][], Function]} */
  const [initNumberArray, setInitNumberArray] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  /** @type {[number[][][], Function]} */
  const [historyNumberArray, setHistoryNumberArray] = useState([]);

  /** @type {[number, Function]} */
  const [historyIndex, setHistoryIndex] = useState(-1);

  const applyInitTable = async () => {
    const preparedNumberArray = await prepareInitTable(40);
    if (preparedNumberArray === null) {
      setToastData({ message: texts.serverError, type: "danger" });
      console.error("SERVER ERROR: The prepare-init-table endpoint is not responding.");
      return;
    }
    setNumberArray(preparedNumberArray.map((row) => [...row]));
    setInitNumberArray(preparedNumberArray.map((row) => [...row]));
    setHistoryNumberArray([preparedNumberArray.map((row) => [...row])]);
    setHistoryIndex(0);
  };

  useEffect(() => {
    applyInitTable();
  }, []);

  const handleFlagClick = () => {
    setTexts(new Texts(texts.anotherLang));
  };

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
    setToastData({ message: texts.probremChanged, type: "success" });
  };

  const handleReset = () => {
    setNumberArray(initNumberArray.map((row) => [...row]));
    setHistoryNumberArray([initNumberArray.map((row) => [...row])]);
    setHistoryIndex(0);
    setToastData({ message: texts.tableReset, type: "success" });
  };

  const handleSolve = async () => {
    const solvedNumberArray = await solveTable(numberArray);
    if (solvedNumberArray === null) {
      setToastData({ message: texts.serverError, type: "danger" });
      console.error("SERVER ERROR: The solve-table endpoint is not responding.");
      return;
    }

    if (solvedNumberArray) {
      setNumberArray(solvedNumberArray);

      const newHistoryNumberArray = historyNumberArray.slice(0, historyIndex + 1);
      newHistoryNumberArray.push(solvedNumberArray);
      setHistoryNumberArray(newHistoryNumberArray);
      setHistoryIndex(historyIndex + 1);
      setToastData({ message: texts.problemSolvedOk, type: "success" });
    } else {
      setToastData({ message: texts.problemSolvedNg, type: "danger" });
    }
  };

  const handleUndo = () => {
    const newHistoryIndex = historyIndex - 1;
    if (newHistoryIndex >= 0) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
      setToastData({ message: texts.tableUndoOk, type: "success" });
    } else {
      setToastData({ message: texts.tableUndoNg, type: "danger" });
    }
  };

  const handleCheck = async () => {
    const canSolve = await checkTableCanSolve(numberArray);
    if (canSolve === null) {
      setToastData({ message: texts.serverError, type: "danger" });
      console.error("SERVER ERROR: The check-table-can-solve endpoint is not responding.");
      return;
    }

    if (canSolve) {
      setToastData({ message: texts.progressCheckedOk, type: "success" });
    } else {
      setToastData({ message: texts.progressCheckedNg, type: "danger" });
    }
  };

  const handleRedo = () => {
    const newHistoryIndex = historyIndex + 1;
    if (newHistoryIndex < historyNumberArray.length) {
      setNumberArray(historyNumberArray[newHistoryIndex]);
      setHistoryIndex(newHistoryIndex);
      setToastData({ message: texts.tableRedoOk, type: "success" });
    } else {
      setToastData({ message: texts.tableRedoNg, type: "danger" });
    }
  };

  const handleToastClose = () => {
    setToastData({ message: "", type: "success" });
  };

  return (
    <div>
      <Toast toastData={toastData} onClose={handleToastClose} />
      <Header title={texts.title} lang={texts.anotherLang} handleFlagClick={handleFlagClick} />
      <main>
        <div className="text-center">
          <UpperSudokuButtons texts={texts} handleChange={handleChange} handleReset={handleReset} handleSolve={handleSolve} />
          <SudokuTable numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
          <LowerSudokuButtons texts={texts} handleUndo={handleUndo} handleCheck={handleCheck} handleRedo={handleRedo} />
        </div>
      </main>
      <Footer />
    </div>
  );
};
