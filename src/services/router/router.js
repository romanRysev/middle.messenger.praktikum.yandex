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
    return (
      Object.values(routes).find((route) => {
        return route.location === window.location.pathname;
      }) ?? routes.notFound
    );
  }
}

export const router = new Router();
