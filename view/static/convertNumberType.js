/**
 * @param {Object.<number, Object.<number, number>>} numberDict
 * @returns {number[][]}
 */
export const convertNumberDictToArray = (numberDict) => {
  return Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => numberDict[i + 1][j + 1] || 0));
};

/**
 * @param {number[][]} numberArray
 * @returns {Object.<number, Object.<number, number>>}
 */
export const convertNumberArrayToDict = (numberArray) => {
  const numberDict = {};
  numberArray.forEach((row, i) => {
    numberDict[i + 1] = {};
    row.forEach((value, j) => {
      numberDict[i + 1][j + 1] = value;
    });
  });
  return numberDict;
};
