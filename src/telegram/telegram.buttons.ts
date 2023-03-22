import { Markup } from 'telegraf';

export function actionButton() {
  return Markup.keyboard([Markup.button.callback('Войти', 'signin')], {
    columns: 1,
  });
}

export function mainButton() {
  return Markup.keyboard([
    Markup.button.callback('Выйти', 'signout'),
    Markup.button.callback('Привет', 'hello'),
  ]);
}
