import tpl from './main.hbs';
import './main.scss';
import { router } from '../services/router/router';

export function mainLayout(params: LayoutFunctionParams): string {
  return tpl({ content: router.getCurrentRoute().template(params) });
}
