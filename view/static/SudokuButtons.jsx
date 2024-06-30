/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const ChangeButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Change
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const ResetButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Reset
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const SolveButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Solve
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleChange
 * @param {Function} props.handleReset
 * @param {Function} props.handleSolve
 * @returns {JSX.Element}
 */
export const UpperSudokuButtons = ({ handleChange, handleReset, handleSolve }) => {
  return (
    <div className="flex justify-center">
      <ChangeButton handleClick={handleChange} />
      <ResetButton handleClick={handleReset} />
      <SolveButton handleClick={handleSolve} />
    </div>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const UndoButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Undo
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const CheckButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Check
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleClick
 * @returns {JSX.Element}
 */
const RedoButton = ({ handleClick }) => {
  return (
    <button className="w-24 px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Redo
    </button>
  );
};

/**
 * @param {Object} props
 * @param {Function} props.handleChange
 * @param {Function} props.handleReset
 * @param {Function} props.handleSolve
 * @returns {JSX.Element}
 */
export const LowerSudokuButtons = ({ handleUndo, handleCheck, handleRedo }) => {
  return (
    <div className="flex justify-center">
      <UndoButton handleClick={handleUndo} />
      <CheckButton handleClick={handleCheck} />
      <RedoButton handleClick={handleRedo} />
    </div>
  );
};
