import { EventBus } from "../event-bus/event-bus";
import { v4 as uuidv4 } from "uuid";
import * as Handlebars from "handlebars";

type Chidren = Record<string, Block | Block[]>;

export abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement;
  private _meta: { tagName: string; propsAndChildren: Props } = { tagName: "div", propsAndChildren: {} };
  private _id: string;

  public props: Props;
  public eventBus: () => EventBus;

  public children: Chidren;

  protected constructor(tagName = "div", propsAndChildren = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      propsAndChildren,
    };
    this._id = uuidv4();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy({ ...props, uuid: this._id }, this);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: Props) {
    const children: Chidren = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public compile(template: TemplateFunction) {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = "";
        child.forEach((child) => {
          propsAndStubs[key] += `<div data-id="${child.props.uuid}"></div>`;
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child.props.uuid}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("div");
    fragment.innerHTML = Handlebars.compile(template(propsAndStubs))(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((child) => {
          const stub = fragment.querySelector(`[data-id="${child.props.uuid}"]`);
          stub?.replaceWith(child.getContent() as Node);
        });
      } else {
        const stub = fragment.querySelector(`[data-id="${child.props.uuid}"]`);
        stub?.replaceWith(child.getContent() as Node);
      }
    });

    return fragment.firstChild;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _render() {
    const block = this.render();

    if (this._element) {
      this._removeEvents();
      this._element.innerHTML = "";
      if (block) {
        this._element.appendChild(block);
      }
      this._addEvents();
    }
  }

  public render(): ChildNode | null {
    return document.createElement("div");
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events as Props).forEach((eventName) => {
      this._element.addEventListener(eventName, (events as EventsProp)[eventName]);
    });
  }

  private _removeEvents() {
    const events: EventsProp = this.props.events as EventsProp;

    if (!events || !this.element) {
      return;
    }

    Object.keys(events).forEach((event) => {
      this.element.removeEventListener(event, events[event]);
    });
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((child) => child.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  public componentDidMount() {
    return true;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    this.componentDidUpdate();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidUpdate() {
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

  private _makePropsProxy(props: Record<string, unknown>, self: Block): Record<string, unknown> {
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

          if (value instanceof Block || (Array.isArray(value) && value[0] instanceof Block)) {
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

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", String(this.props.uuid));
    return element;
  }

  public show() {
    this.getContent().style.display = "block";
  }

  public hide() {
    this.getContent().style.display = "none";
  }
}
