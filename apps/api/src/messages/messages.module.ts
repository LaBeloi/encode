import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { CaesarService } from './caesar.service';
import { XORService } from './xor.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, CaesarService, XORService],
})
export class MessagesModule {}
