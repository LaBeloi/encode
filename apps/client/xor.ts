function toBinaryCode(letter: string): string {
  return letter.charCodeAt(0).toString(2)
}

function fromBinaryCode(code: string): string {
  const decimal = parseInt(code, 2);
  return String.fromCharCode(decimal);
}

const key = '01001000';

function coddingLogic(str: string): string {
  const encoded = toBinaryCode(str);
  const result = encoded.split('').map((value, index) => {
    if (value === key[index]) return 0
    return 1
  }).join('')
  return fromBinaryCode(result);
}

export function XOR(value: string): string {
  return value.split('').map((letter) => coddingLogic(letter)).join('');
}