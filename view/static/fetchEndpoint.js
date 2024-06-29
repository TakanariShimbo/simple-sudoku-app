import { convertNumberArrayToDict, convertNumberDictToArray } from "./convertNumberType.js";

/**
 * @param {number[][]} numberArray
 * @returns {Promise<number[][] | null>}
 */
export const solveTable = async (numberArray) => {
  const endpoint = "/api/solve-table";
  const bodyData = { number_dict: convertNumberArrayToDict(numberArray) };

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

/**
 * @param {number} nEmptyCells
 * @returns {Promise<number[][] | null>}
 */
export const prepareInitTable = async (nEmptyCells) => {
  const endpoint = "/api/prepare-init-table";
  const bodyData = { n_empty_cells: nEmptyCells };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to prepare the table: ${response.statusText}`);
    }

    const responseData = await response.json();
    return convertNumberDictToArray(responseData.number_dict);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
