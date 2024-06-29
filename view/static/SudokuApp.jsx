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

const TableRows = () => {
  return (
    <div className="inline-grid grid-rows-9 grid-cols-9">
      {Array.from({ length: 9 }, (_, i) => (
        <>
          {Array.from({ length: 9 }, (_, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              min={1}
              max={9}
              className="h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400"
              data-i={i + 1}
              data-j={j + 1}
            />
          ))}
        </>
      ))}
      ;
    </div>
  );
};

const SudokuTable = () => {
  return (
    <div className="relative">
      <TableLines />
      <TableRows />
    </div>
  );
};

////////////////////////////////
// BUTTON
////////////////////////////////
const SolveButton = () => {
  return <button className="px-4 py-1 rounded-md m-3 border-2 border-blue-700">Solve</button>;
};

const SudokuButtons = () => {
  return (
    <div className="flex justify-center">
      <SolveButton />
    </div>
  );
};

////////////////////////////////
// APP
////////////////////////////////
const SudokuApp = () => {
  return (
    <>
      <header>
        <h1 class="text-3xl m-5 text-center">Sudoku App</h1>
      </header>
      <main>
        <div className="text-center">
          <SudokuTable />
          <SudokuButtons />
        </div>
      </main>
    </>
  );
};

ReactDOM.render(<SudokuApp />, document.getElementById("root"));
