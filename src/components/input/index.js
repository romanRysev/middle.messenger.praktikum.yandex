import Handlebars from "handlebars";
import tpl from "./input.hbs";
import "./input.scss";

Handlebars.registerPartial("input", tpl);

export default (data) => {
  return tpl(data);
};
