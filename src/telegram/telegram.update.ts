import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { AuthService } from 'src/auth/auth.service';
import { Telegraf } from 'telegraf';
import { Context } from './context.interface';
import { Public } from '../auth/decorators/public.decorator';
import { actionButton, mainButton } from './telegram.buttons';
@Update()
export class TelegramUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Ты войдешь?', actionButton());
  }
  @Public()
  @Hears('Войти')
  async signin(ctx: Context) {
    ctx.session.deleteMessages = [
      (await ctx.reply('Напишите ваш email: ')).message_id,
    ];
    ctx.session.type = 'signin';
  }
  @Public()
  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    switch (ctx.session.type) {
      case 'signin':
        try {
          const id = (await ctx.reply('Напишите ваш пароль: ')).message_id;
          ctx.session.type = 'signin2';
          ctx.session.email = message;
          ctx.session.deleteMessages.push(id);
          ctx.session.deleteMessages.push(ctx.message.message_id);
        } catch (error) {
          console.log(error);
          ctx.reply('Ошибка');
        }

        break;
      case 'signin2':
        try {
          const user = await this.authService
            .signin({ email: ctx.session.email, password: message })
            .then((response) => {
              return response.user;
            });
          ctx.session.deleteMessages.push(ctx.message.message_id);
          ctx.session.deleteMessages.forEach(async (el) => {
            await ctx.deleteMessage(el);
          });
          await ctx.reply('Здравствуйте, ' + user.username, mainButton());
          ctx.session.type = undefined;
          ctx.session.email = undefined;
          ctx.session.isAuth = true;
        } catch (error) {
          console.log(error);
          ctx.reply('Ошибка');
        }
        break;
      default:
        await ctx.reply('Что?');
        return;
    }
  }
  @Hears('hello')
  async hello(ctx: Context) {
    await ctx.sendMessage('Привет!');
  }
}
