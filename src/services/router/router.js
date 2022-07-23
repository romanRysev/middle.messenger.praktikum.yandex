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
    const route = Object.values(routes).find((route) => {
      return route.location === window.location.pathname;
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
