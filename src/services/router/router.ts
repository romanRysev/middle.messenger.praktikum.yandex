import { Block } from "../../core/block/block";
import { Chats } from "../../modules/chat/chat";
import { Registration } from "../../modules/entry/registration";
import { Signin } from "../../modules/entry/signin";
import { ErrorTemplate } from "../../modules/error/error";
import { PasswordChange } from "../../modules/profile/password-change";
import { Profile } from "../../modules/profile/profile";
import { ProfileEdit } from "../../modules/profile/profile-edit";
import { renderer } from "../renderer/renderer";

function isEqual(lhs: unknown, rhs: unknown) {
  return lhs === rhs;
}

type BlockType = typeof Chats | typeof Registration | typeof Signin | typeof ErrorTemplate | typeof PasswordChange | typeof Profile | typeof ProfileEdit;

class Route {
  private _pathname: string;
  private _blockClass: BlockType;
  private _block: Block | null;
  private _props: Props;

  constructor(pathname: string, view: BlockType, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      renderer.render(this._block, String(this._props.rootQuery));
      return;
    }

    this._block.show();
  }
}

class Router {
  public routes: Route[];
  public history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockType) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      console.log(event);

      this._onRoute((event.currentTarget as Window)?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(/*route, pathname*/);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));

    if (route) {
      return route;
    } else {
      return this.routes.find((route) => route.match("/404")) ?? new Route("/404", ErrorTemplate, { rootQuery: this._rootQuery });
    }
  }
}

const routerModule = new Router("#app");

routerModule
  .use("/chat", Chats)
  .use("/", Chats)
  .use("/profile", Profile)
  .use("/signin", Signin)
  .use("/registration", Registration)
  .use("/edit-profile", ProfileEdit)
  .use("/change-password", PasswordChange)
  .use("/404", ErrorTemplate);

export const router = routerModule;
