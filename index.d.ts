declare module "*.hbs";
declare module "*.svg";
declare module "*.scss";

type Route = {
  templateName: string;
  location: string;
  eventListeners?: CustomEventListener[];
  params?: Record<string, string>;
};

type CustomEventListener = {
  selector: string;
  listener: () => void;
  event: string;
};

type Routes = Record<string, Route>;

type LayoutFunction = (params?: LayoutFunctionParams) => string;

type LayoutFunctionParams = Record<string, unknown> | undefined;

type ListenerCallback = (params?: unknown | undefined) => unknown;
