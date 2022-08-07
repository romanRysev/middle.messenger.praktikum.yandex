import tpl from './chat.hbs';
import './chat.scss';
import { list, messages } from './tempData';

export function chat(
  params = {
    list,
    messages,
  },
) {
  return tpl(params);
}
