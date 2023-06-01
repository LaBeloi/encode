import { Injectable } from '@nestjs/common';

@Injectable()
export class XORService {
  xor_coding(value: string): string {
    return value
      .split('')
      .map((letter) => this.coddingLogic(letter))
      .join('');
  }

  private coddingLogic(str: string): string {
    const encoded = this.toBinaryCode(str);
    const result = encoded
      .split('')
      .map((value, index) => {
        if (value === this.key[index]) return 0;
        return 1;
      })
      .join('');
    return this.fromBinaryCode(result);
  }

  private toBinaryCode(letter: string): string {
    return letter.charCodeAt(0).toString(2);
  }

  private fromBinaryCode(code: string): string {
    const decimal = parseInt(code, 2);
    return String.fromCharCode(decimal);
  }

  private readonly key = '01001000';
}
