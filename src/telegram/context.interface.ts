import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
  session: {
    type?: 'signin' | 'signin2';
    email?: string;
    isAuth?: boolean;
    deleteMessages?: number[];
  };
}
