import { EventBus } from "../../services/event-bus/event-bus";
import { v4 as uuidv4 } from "uuid";
import { renderer } from "../../services/renderer/renderer";
import * as Handlebars from "handlebars";
export type Props = Record<string, unknown>;

export abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; propsAndChildren: Props } = { tagName: "div", propsAndChildren: {} };
  private _id: "";

  public props: Props | undefined;
  public eventBus: () => EventBus;

  public children: Record<string, Block>;

  protected constructor(tagName = "div", propsAndChildren = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      propsAndChildren,
    };
    this._id = uuidv4();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy({ ...props, id: this._id });
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public compile(template) {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.props.id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(template(propsAndStubs))(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.props.id}"]`);
      stub?.replaceWith(child.render());
    });

    return fragment.content;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _render() {
    const block = this.render();

    if (this._element) {
      this._element.innerHTML = "";
      this._element.appendChild(block);
      this._addEvents();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return "domstring";
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount() {
    console.log("mounted");
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    this.componentDidUpdate(oldProps, newProps);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log("updated", oldProps, newProps);

    return true;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps || !this.props) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  _makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
    const self = this;
    const proxyData = new Proxy(props, {
      get(target, prop) {
        if (typeof prop !== "symbol") {
          if (prop.indexOf("_") === 0) {
            throw new Error("нет доступа");
          }

          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
        return;
      },
      set(target, prop, value) {
        if (typeof prop !== "symbol") {
          if (prop.indexOf("_") === 0) {
            throw new Error("нет доступа");
          }

          if (value instanceof Block) {
            self.children[prop] = value;
          } else {
            target[prop] = value;
          }
          self.eventBus().emit(Block.EVENTS.FLOW_CDU);
          return true;
        }
        return false;
      },
      deleteProperty() {
        throw new Error("нет доступа");
      },
    });
    return proxyData;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", String(this.props?.id));
    return element;
  }

  show() {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = "none";
    }
  }
}
