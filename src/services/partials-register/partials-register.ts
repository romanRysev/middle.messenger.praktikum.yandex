import * as Handlebars from 'handlebars';
import avatarTemplate from '../../components/partials/avatar/avatar.hbs';
import buttonTemplate from '../../components/partials/button/button.hbs';
import inputTemplate from '../../components/partials/input/input.hbs';
import shortViewTemplate from '../../components/partials/short-view/short-view.hbs';

export class PartialsRegister {
  constructor() {
    Handlebars.registerPartial('avatar', avatarTemplate);
    Handlebars.registerPartial('button', buttonTemplate);
    Handlebars.registerPartial('input', inputTemplate);
    Handlebars.registerPartial('short-view', shortViewTemplate);
  }
}
