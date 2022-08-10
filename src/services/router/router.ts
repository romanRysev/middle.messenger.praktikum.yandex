import { ErrorTemplate } from "../../modules/error/error";
import { routes } from "./config";
class Router {
  constructor() {
    this.setCurrentRoute(this.getRouteFromLocation());
  }

  currentRoute: Route = routes.mainPage;

  setCurrentRoute(route: Route) {
    this.currentRoute = route;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getRouteFromLocation() {
    const location = window.location.pathname.slice(-1) === "/" && window.location.pathname.length > 1 ? window.location.pathname.slice(0, -1) : window.location.pathname;
    const route = Object.values(routes).find((route) => route.location === location);
    if (route) {
      return route;
    }
    if (routes.error.params) {
      routes.error.params.code = "404";
      routes.error.params.text = "Не туда попали";
    } else {
      routes.error.params = { content: new ErrorTemplate({ code: "404", text: "Не туда попали" }) };
    }
    return routes.error;
  }
}

export const router = new Router();
