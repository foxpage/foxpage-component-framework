import EventEmitter from 'eventemitter3';

export class FoxpageEventEmitter {
  private __EMITTER_INS__: EventEmitter;
  // 标识正在触发的 emit 的 event, 用于处理无限循环 emit
  private __EMITTING_MAP__: Record<string, boolean>;
  public on: EventEmitter['on'];
  public off: EventEmitter['off'];
  public once: EventEmitter['once'];
  constructor() {
    this.__EMITTER_INS__ = new EventEmitter();
    this.__EMITTING_MAP__ = {};
    this.on = this.__EMITTER_INS__.on.bind(this.__EMITTER_INS__);
    this.off = this.__EMITTER_INS__.off.bind(this.__EMITTER_INS__);
    this.once = this.__EMITTER_INS__.once.bind(this.__EMITTER_INS__);
  }
  public emit(event: string, data?: Record<any, any>) {
    if (this.__EMITTING_MAP__[event]) {
      console.error(
        `[foxpage emitter]: The event is in emitting, can't emit itself in the emitting of event(${event})`,
      );
      console.warn(
        `[foxpage emitter]: If you have already dealt with the logic of breaking out of the loop within the Emitting, you can use the forceEmit method instead.`,
      );
      return false;
    }
    this.__EMITTING_MAP__[event] = true;
    const status = this.__EMITTER_INS__.emit(event, data);
    if (!status) {
      console.warn(`[foxpage emitter]: The event(${event}) has no listener`);
    }
    delete this.__EMITTING_MAP__[event];
    return status;
  }
  public forceEmit(event: string, data?: Record<any, any>) {
    const status = this.__EMITTER_INS__.emit(event, data);
    if (!status) {
      console.warn(`[foxpage emitter]: The event(${event}) has no listener`);
    }
    return status;
  }
}

export const FoxpageEmitter: FoxpageEventEmitter =
  window?.__FOXPAGE_CONTEXT_EVENTEMITTER__ || new FoxpageEventEmitter();

// keep instance only one
if (typeof window !== undefined && !window?.__FOXPAGE_CONTEXT_EVENTEMITTER__) {
  window['__FOXPAGE_CONTEXT_EVENTEMITTER__'] = FoxpageEmitter;
}

export const getFoxpageEmitter = () => {
  return FoxpageEmitter;
};
