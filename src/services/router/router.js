import { routes } from "./config";

class Router {
  constructor() {
    this.currentRoute = null;
    this.setCurrentRoute(this.getRouteFromLocation());
  }

  setCurrentRoute(route) {
    this.currentRoute = route;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getRouteFromLocation() {
    const location =
      window.location.pathname.slice(-1) === "/" &&
      window.location.pathname.length > 1
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname;
    const route = Object.values(routes).find((route) => {
      return route.location === location;
    });
    if (route) {
      return route;
    } else {
      routes.error.params.code = "404";
      routes.error.params.text = "Не туда попали";
      return routes.error;
    }
  }
}

export const router = new Router();
