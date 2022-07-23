import Handlebars from "handlebars";
import tpl from "./button.hbs";
import "./button.scss";

Handlebars.registerPartial("button", tpl);

export default (params) => {
  return tpl(params);
};
