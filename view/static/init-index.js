/**
 * Prepares the Sudoku table in the specified container.
 * This function requires jQuery and Tailwind CSS to be imported.
 *
 * @param {string} mainId - The ID of the main container where the Sudoku table will be created.
 */
export function prepareSudokuTable(mainId) {
  const tableId = "sudoku-table";
  const tableLinesId = "sudoku-table-lines";
  const tableCellsId = "sudoku-table-cells";

  // prepare table
  const main = $(`#${mainId}`);
  $("<div>", {
    id: tableId,
    class: "relative",
  }).appendTo(main);

  // prepare table lines
  const table = $(`#${tableId}`);
  $("<div>", {
    id: tableLinesId,
    class: "inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3",
  }).appendTo(table);

  const tableLines = $(`#${tableLinesId}`);
  for (var j = 1; j <= 9; j++) {
    $("<div>", {
      class: "h-24 w-24 border border-black",
    }).appendTo(tableLines);
  }

  // prepare table cells
  $("<div>", {
    id: tableCellsId,
    class: "inline-grid grid-rows-9 grid-cols-9",
  }).appendTo(table);

  const tableCells = $(`#${tableCellsId}`);
  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      $("<input>", {
        type: "number",
        min: 1,
        max: 9,
        class: "h-8 w-8 p-2.5 text-base outline-1 outline outline-gray-400",
        "data-i": i,
        "data-j": j,
      }).appendTo(tableCells);
    }
  }
}

/**
 * Prepares buttons for Sudoku operations in the specified container.
 * This function requires jQuery and Tailwind CSS to be imported.
 *
 * @param {string} mainId - The ID of the main container where the buttons will be created.
 */
export function prepareButtons(mainId) {
  const buttonAreaId = "button-area";
  const solveButtonId = "solve-button";

  // prepare button area
  const main = $(`#${mainId}`);
  $("<div>", {
    id: buttonAreaId,
    class: "flex justify-center",
  }).appendTo(main);

  // prepare buttons
  const buttonArea = $(`#${buttonAreaId}`);
  $("<button>", {
    id: solveButtonId,
    class: "px-4 py-1 rounded-md m-3 border-2 border-blue-700",
    text: "Solve",
  }).appendTo(buttonArea);
}
