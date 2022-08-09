import { EventBus } from "../../services/event-bus/event-bus";

export type Props = Record<string, unknown>;

export abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Props } = { tagName: "div", props: {} };

  public props: Props | undefined;
  public eventBus: () => EventBus;

  protected constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
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

  _render(props: Props) {
    const block = this.render(props);

    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render(props: Props) {
    return "domstring";
  }

  private _componentDidMount() {
    this.componentDidMount();
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
    console.log(1);
  };

  get element() {
    return this._element;
  }

  getContent() {
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
        console.log(2);

        if (typeof prop !== "symbol") {
          if (prop.indexOf("_") === 0) {
            throw new Error("нет доступа");
          }
          target[prop] = value;
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
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
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
