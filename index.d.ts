declare module "*.hbs";
declare module "*.svg";
declare module "*.scss";
declare module "*.css";

type LayoutFunction = (params?: LayoutFunctionParams) => string;

type LayoutFunctionParams = Record<string, unknown> | undefined;

type ListenerCallback = (params?: unknown | undefined) => unknown;

type Props = Record<string, unknown>;

type TemplateFunction = (props: Props) => string;

type EventsProp = Record<string, (event?: Event) => void>;
