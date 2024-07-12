import { Texts } from "./Texts.js";

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const Button = ({ label, handleClick }) => {
  return (
    <button
      className="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 m-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Texts} props.texts
 * @param {Function} props.handleChange
 * @param {Function} props.handleReset
 * @param {Function} props.handleSolve
 * @returns {JSX.Element}
 */
export const UpperSudokuButtons = ({ texts, handleChange, handleReset, handleSolve }) => {
  return (
    <div className="flex justify-center">
      <Button label={texts.change} handleClick={handleChange} />
      <Button label={texts.reset} handleClick={handleReset} />
      <Button label={texts.solve} handleClick={handleSolve} />
    </div>
  );
};

/**
 * @param {Object} props
 * @param {Texts} props.texts
 * @param {Function} props.handleChange
 * @param {Function} props.handleReset
 * @param {Function} props.handleSolve
 * @returns {JSX.Element}
 */
export const LowerSudokuButtons = ({ texts, handleUndo, handleCheck, handleRedo }) => {
  return (
    <div className="flex justify-center">
      <Button label={texts.undo} handleClick={handleUndo} />
      <Button label={texts.check} handleClick={handleCheck} />
      <Button label={texts.redo} handleClick={handleRedo} />
    </div>
  );
};
