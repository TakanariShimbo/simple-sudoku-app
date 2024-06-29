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
 * @param {function} props.handleUpdate
 * @returns {JSX.Element}
 */
const TableCells = ({ numberArray, handleUpdate }) => {
  return (
    <div className="inline-grid grid-rows-9 grid-cols-9">
      {numberArray.map((row, i) => (
        <>
          {row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              min={1}
              max={9}
              value={value || ""}
              onChange={(e) => handleUpdate(e, i, j)}
              className="h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400"
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
 * @param {function} props.handleUpdate
 * @returns {JSX.Element}
 */
export const SudokuTable = ({ numberArray, handleUpdate }) => {
  return (
    <div className="relative">
      <TableLines />
      <TableCells numberArray={numberArray} handleUpdate={handleUpdate} />
    </div>
  );
};
