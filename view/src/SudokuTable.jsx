/**
 * @returns {JSX.Element}
 */
const TableLines = () => {
  return (
    <div className="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="h-24 w-24 border border-black"></div>
      ))}
    </div>
  );
};

/**
 * @param {Object} props
 * @param {number[][]} props.numberArray
 * @param {number[][]} props.initNumberArray
 * @param {function} props.handleUpdate
 * @returns {JSX.Element}
 */
const TableCells = ({ numberArray, initNumberArray, handleUpdate }) => {
  const combinedArray = numberArray.map((row, i) =>
    row.map((value, j) => ({
      value: value,
      hasInitValue: initNumberArray[i][j] !== 0,
    }))
  );
  return (
    <div className="inline-grid grid-rows-9 grid-cols-9">
      {combinedArray.map((row, i) => (
        <>
          {row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              min={1}
              max={9}
              value={cell.value || ""}
              onChange={(e) => handleUpdate(e, i, j)}
              className={`h-8 w-8 p-2.5 text-base border-gray-400 focus:border-gray-400 outline-none focus:outline-none focus:ring-0 
                ${cell.hasInitValue ? "bg-gray-200" : ""} ${cell.hasInitValue ? "bg-gray-200" : "focus:bg-blue-100"}`}
              readOnly={cell.hasInitValue}
            />
          ))}
        </>
      ))}
    </div>
  );
};

/**
 * @param {Object} props
 * @param {number[][]} props.numberArray
 * @param {number[][]} props.initNumberArray
 * @param {function} props.handleUpdate
 * @returns {JSX.Element}
 */
export const SudokuTable = ({ numberArray, initNumberArray, handleUpdate }) => {
  return (
    <div className="relative">
      <TableLines />
      <TableCells numberArray={numberArray} initNumberArray={initNumberArray} handleUpdate={handleUpdate} />
    </div>
  );
};
