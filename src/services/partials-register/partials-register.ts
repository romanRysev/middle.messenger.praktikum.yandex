import * as Handlebars from "handlebars";
import avatarTemplate from "../../components/partials/avatar/avatar";
//import buttonTemplate from "../../components/partials/button/button";
import inputTemplate from "../../components/partials/input/input";
//import { shortView } from "../../components/partials/short-view/short-view";

export class PartialsRegister {
  constructor() {
    Handlebars.registerPartial("avatar", avatarTemplate);
    // Handlebars.registerPartial("button", buttonTemplate);
    Handlebars.registerPartial("input", inputTemplate);
    //Handlebars.registerPartial("short-view", shortView);
  }
}
