import { Injectable } from '@nestjs/common';

@Injectable()
export class CaesarService {
  caesar_coding(value: string, shift: number): string {
    return value
      .split('')
      .map((item) => this.coddingLogic(item, shift))
      .join('');
  }

  caesar_decoding(value: string, shift: number): string {
    return value
      .split('')
      .map((item) => this.coddingLogic(item, shift, true))
      .join('');
  }

  private coddingLogic(str: string, shift: number, isDecode = false): string {
    if (!this.getIsLetter(str)) {
      return str;
    }

    const alphabetInUppercase = this.getAlphabetInUppercase();
    const isUppercase = this.getIsUppercase(str);
    const index = isUppercase
      ? alphabetInUppercase.findIndex((letter) => letter === str)
      : alphabetInUppercase.findIndex((letter) => letter === str.toUpperCase());

    let newIndex: number;

    if (isDecode) {
      const constantShift = this.calcIndex(shift);
      const num = index - constantShift;

      if (num < 0) {
        const newNum = num * -1;
        newIndex = alphabetInUppercase.length - newNum;
      } else {
        newIndex = num;
      }
    } else {
      newIndex = this.calcIndex(index + shift);
    }

    const result = isUppercase
      ? alphabetInUppercase[newIndex]
      : alphabetInUppercase[newIndex].toLocaleLowerCase();

    return result;
  }

  private getIsUppercase(str: string): boolean {
    return /[A-Z]/.test(str);
  }

  private getIsLetter(letter: string): boolean {
    return /^[a-zA-Z]+$/.test(letter);
  }

  private calcIndex(index: number): number {
    const alphabetInUppercase = this.getAlphabetInUppercase();
    return index % alphabetInUppercase.length;
  }

  private getAlphabetInUppercase() {
    const alpha = Array.from(Array(26)).map((_, i) => i + 65);
    return alpha.map((x) => String.fromCharCode(x));
  }
}
