export function encodeBoard(board: Array<Array<string | number>>) {
  const encodedBoard = board
    .map(row => row.map(col => +col))
    .reduce(
      (prev, curr, currIdx) =>
        prev +
        `%5B${encodeURIComponent(JSON.stringify(curr))}%5D${
          currIdx === board.length - 1 ? '' : '%2C'
        }`,
      '',
    );

  return `board=%5B${encodedBoard}%5D`;
}
