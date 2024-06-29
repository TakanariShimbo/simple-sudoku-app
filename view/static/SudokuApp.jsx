////////////////////////////////
// CONVERT NUMBER TYPE
////////////////////////////////

const convertNumberDictToArray = (numberDict) => {
  return Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => numberDict[i + 1][j + 1] || 0));
};

const convertNumberArrayToDict = (numberArray) => {
  const numberDict = {};
  numberArray.forEach((row, i) => {
    numberDict[i + 1] = {};
    row.forEach((value, j) => {
      numberDict[i + 1][j + 1] = value;
    });
  });
  return numberDict;
};

////////////////////////////////
// API
////////////////////////////////
const solveTable = async (numberArray) => {
  const bodyData = { number_dict: convertNumberArrayToDict(numberArray) };
  const endpoint = "/api/solve-table";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error("Failed to solve the puzzle");
    }

    const responseData = await response.json();
    return convertNumberDictToArray(responseData.number_dict);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

////////////////////////////////
// TABLE
////////////////////////////////
const TableLines = () => {
  return (
    <div className="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="h-24 w-24 border border-black"></div>
      ))}
    </div>
  );
};

const TableCells = ({ numberArray, handleTableUpdate }) => {
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
              onChange={(e) => handleTableUpdate(e, i, j)}
              className="h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400"
            />
          ))}
        </>
      ))}
    </div>
  );
};

const SudokuTable = ({ numberArray, handleTableUpdate }) => {
  return (
    <div className="relative">
      <TableLines />
      <TableCells numberArray={numberArray} handleTableUpdate={handleTableUpdate} />
    </div>
  );
};

////////////////////////////////
// BUTTON
////////////////////////////////
const ResetButton = ({ handleClick }) => {
  return (
    <button className="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Reset
    </button>
  );
};

const SolveButton = ({ handleClick }) => {
  return (
    <button className="px-4 py-1 rounded-md m-3 border-2 border-blue-700" onClick={handleClick}>
      Solve
    </button>
  );
};

const SudokuButtons = ({ handleReset, handleSolve }) => {
  return (
    <div className="flex justify-center">
      <ResetButton handleClick={handleReset} />
      <SolveButton handleClick={handleSolve} />
    </div>
  );
};

////////////////////////////////
// APP
////////////////////////////////
const SudokuApp = () => {
  const initialNumberDict = {
    1: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 7, 6: 0, 7: 5, 8: 0, 9: 0 },
    2: { 1: 8, 2: 6, 3: 0, 4: 0, 5: 0, 6: 0, 7: 2, 8: 7, 9: 0 },
    3: { 1: 0, 2: 0, 3: 1, 4: 6, 5: 5, 6: 0, 7: 0, 8: 0, 9: 0 },
    4: { 1: 4, 2: 0, 3: 7, 4: 0, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0 },
    5: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 9, 6: 0, 7: 0, 8: 0, 9: 4 },
    6: { 1: 6, 2: 2, 3: 9, 4: 3, 5: 4, 6: 8, 7: 1, 8: 5, 9: 7 },
    7: { 1: 7, 2: 1, 3: 6, 4: 5, 5: 2, 6: 9, 7: 4, 8: 8, 9: 3 },
    8: { 1: 9, 2: 3, 3: 2, 4: 4, 5: 8, 6: 6, 7: 7, 8: 1, 9: 5 },
    9: { 1: 5, 2: 4, 3: 8, 4: 7, 5: 1, 6: 3, 7: 6, 8: 9, 9: 2 },
  };
  const initialNumberArray = convertNumberDictToArray(initialNumberDict);

  const [numberArray, setNumberArray] = React.useState(Array.from({ length: 9 }, () => Array(9).fill(0)));

  React.useEffect(() => {
    setNumberArray(initialNumberArray);
  }, []);

  const handleTableUpdate = (e, i, j) => {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 9 || initialNumberArray[i][j] !== 0) {
      e.target.value = initialNumberArray[i][j];
      return;
    }
    const newNumberArray = [...numberArray];
    newNumberArray[i][j] = value;
    setNumberArray(newNumberArray);
  };

  const handleReset = () => {
    setNumberArray([...initialNumberArray]);
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
          <SudokuTable numberArray={numberArray} handleTableUpdate={handleTableUpdate} />
          <SudokuButtons handleReset={handleReset} handleSolve={handleSolve} />
        </div>
      </main>
    </>
  );
};

ReactDOM.render(<SudokuApp />, document.getElementById("root"));
