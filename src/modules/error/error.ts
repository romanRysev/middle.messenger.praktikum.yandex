import tpl from './error.hbs';
import './error.scss';

export function error(params: LayoutFunctionParams) {
  return tpl(params);
}
