/** 发布订阅者模式 */

class PublishSubscribe {
  events: {
    [key: string]: Array<(...restParams) => void>;
  };

  constructor() {
    this.events = {};
  }

  // 订阅方法
  public subscribe(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(callback);
  }

  // 发布方法
  public publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((callback) => callback(...args));
    }
  }

  // 取消订阅方法
  public unSubscribe(type, callback) {
    if (this.events[type]) {
      const callbackIndex = this.events[type].findIndex((e) => e === callback);
      if (callbackIndex !== -1) {
        this.events[type].splice(callbackIndex, 1);
      }
    }
    if (this.events[type].length === 0) {
      delete this.events[type];
    }
  }

  public unSubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

export { PublishSubscribe };
