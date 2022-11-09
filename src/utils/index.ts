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
