// Types
import type {Game} from '@/types';

export function capitalize(inputText: string) {
  const text = inputText.split('');
  text[0] = text[0].toUpperCase();

  return text.join('');
}

export function generateRandomColor() {
  return (
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')'
  );
}

export function increaseDouble(targetNumber: number, increment: number) {
  const result = [];
  for (let i = 0; i <= targetNumber; i += +`0.${increment}`) {
    result.push(+i.toFixed(1));
  }
  return result;
}

export function repeatRandomColors(times: number) {
  return 'a'
    .repeat(times)
    .split('')
    .map(() => generateRandomColor());
}

export function encodeBoard(board: Game['board']): string {
  const encodedBoard = board
    .map(row => row.map(col => col.value))
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

export function decodeBoard(board: number[][]): Game['board'] {
  const decodedBoard = board.map(row =>
    row.map(col => ({
      editable: col === 0,
      value: col,
    })),
  );

  return decodedBoard;
}
