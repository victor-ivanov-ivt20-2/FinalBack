import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramUpdate } from './telegram.update';
import * as LocalSession from 'telegraf-session-local';
import { TelegrafModule } from 'nestjs-telegraf';

const session = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [session.middleware()],
      token: '6124602912:AAGHov2pOVKsbA1vQFkllI4uhIKKDVDdN-U',
    }),
  ],
  providers: [TelegramUpdate, AuthService, JwtService, PrismaService],
})
export class TelegramModule {}
