import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from '../dto';
import { GetCurrentUser } from '../common/decorators';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('')
  getMessages(@GetCurrentUser('sub') userId: string) {
    return this.messagesService.getMessages(userId);
  }

  @Get(':id/decode')
  decodeMessage(@Param('id') messageId: string) {
    return this.messagesService.decodeMessage(messageId);
  }

  @Post('/create')
  createMessage(@Body() message: MessageDto) {
    return this.messagesService.encodeMessage(message);
  }

  @Delete(':id')
  deleteMessage(@Param('id') messageId: string) {
    console.log(messageId);
    return this.messagesService.deleteMessage(messageId);
  }
}
