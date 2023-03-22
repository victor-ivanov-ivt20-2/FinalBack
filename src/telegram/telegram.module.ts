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
      token: '6240245228:AAHX3ONVeSlChx1l6DFa_XNtre3CHAPNeDY',
    }),
  ],
  providers: [TelegramUpdate, AuthService, JwtService, PrismaService],
})
export class TelegramModule {}
