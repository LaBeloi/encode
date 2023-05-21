const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const alphabetInUppercase = alpha.map((x) => String.fromCharCode(x));
console.log('ALPHABET = > ', alphabetInUppercase);

function getIsUppercase(str: string): boolean {
  return /[A-Z]/.test(str);
}

function getIsLetter(letter: string): boolean {
  return /^[a-zA-Z]+$/.test(letter)
}

function calcIndex(index: number): number {
  return index%alphabetInUppercase.length
}

function coddingLogic(str: string, shift: number): string {
  if (!getIsLetter(str)) {
    return str
  }

  const isUppercase = getIsUppercase(str);
  const index = isUppercase
    ? alphabetInUppercase.findIndex((letter) => letter === str)
    : alphabetInUppercase.findIndex((letter) => letter === str.toUpperCase())

  const newIndex = calcIndex(index + shift);
  
  const result = isUppercase
    ? alphabetInUppercase[newIndex]
    : alphabetInUppercase[newIndex].toLocaleLowerCase()

  return result
}

export function Caesar(value: string, shift: number) :string {
  return value.split('').map((item) => coddingLogic(item, shift)).join('')
} 