export default function formatNumberToThousands(num: number): string {
  if (isNaN(num) || typeof num !== 'number') {
    throw new Error('Input must be a valid number')
  }
  const [integerPart, decimalPart] = num.toString().split('.')
  let formatterInteger = ''
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      formatterInteger = ',' + formatterInteger
    }
    formatterInteger = integerPart[i] + formatterInteger
  }
  return decimalPart ? `${formatterInteger}.${decimalPart}` : formatterInteger
}
