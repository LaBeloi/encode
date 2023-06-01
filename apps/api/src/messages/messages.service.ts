import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from '../dto';
import { CipherTypes } from '@prisma/client';
import { CaesarService } from './caesar.service';
import { XORService } from './xor.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly caesarService: CaesarService,
    private readonly xorService: XORService,
  ) {}
  async getMessages(userId: string) {
    return this.prisma.message.findMany({
      where: {
        userId,
      },
    });
  }

  async decodeMessage(messageId: string) {
    if (!messageId) {
      throw new BadRequestException('messageId required');
    }

    const { message, coding_type, shift } =
      await this.prisma.message.findUnique({
        where: { id: messageId },
      });

    if (coding_type === CipherTypes.Caesar) {
      return this.caesarService.caesar_decoding(message, shift);
    }
    return this.xorService.xor_coding(message);
  }

  async encodeMessage(message: MessageDto, userId: string) {
    let newMessage = '';

    if (message.coding_type === CipherTypes.Caesar) {
      newMessage = this.caesarService.caesar_coding(
        message.message,
        message.shift,
      );
    } else {
      newMessage = this.xorService.xor_coding(message.message);
    }

    const data: MessageDto = {
      ...message,
      message: newMessage,
    };

    return this.prisma.message.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async deleteMessage(messageId: string) {
    if (!messageId) {
      throw new BadRequestException('messageId required');
    }

    return this.prisma.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
