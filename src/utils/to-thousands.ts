export default function formatNumberToThousands(num: number): string {
  // 推荐使用 es6 的 Number.isNaN 判断是否为 NaN
  // 参考 https://wangdoc.com/es6/number#numberisfinite-numberisnan
  if (Number.isNaN(num)) {
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
