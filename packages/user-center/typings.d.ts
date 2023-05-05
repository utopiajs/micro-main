import '@umijs/max/typings';

declare global {
  interface Window {
    _MICRO_MAIN_CORE_PUB_SUB_: any;
  }
}
