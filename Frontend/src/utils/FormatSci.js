// utils/formatSci.js
export function formatScientific(num) {
  return num.toExponential(4).replace(/e([+-])/i, "e $1 ");
}
