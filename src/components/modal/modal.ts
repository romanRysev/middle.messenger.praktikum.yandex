import tpl from './modal.hbs';
import './modal.scss';

export function modal(content: string) {
  return tpl({ content });
}
