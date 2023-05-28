import {
  INestApplicationContext,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'database';

export type OnShutdownCallback = () => Promise<void>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(
    app: INestApplicationContext,
    callback?: OnShutdownCallback,
  ) {
    this.$on('beforeExit', async () => {
      if (callback) {
        await callback();
      }
      await app.close();
    });
  }
}
