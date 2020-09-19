/*eslint no-debugger: 0*/

let _Vue = null;
export default class Vuex {
  static install(Vue) {
    if (this.install.installed) return;
    this.install.installed = true;

    _Vue = Vue;

    _Vue.mixin({
      beforeCreate() {
        if (this.$options.store) {
          _Vue.prototype.$store = this.$options.store;
        } else {
          this.$store = this.$parent && this.$parent.$store;
        }
      },
    });
  }

  init() {}
}

Vuex.Store = class Store {
  constructor(options) {
    // 数据劫持
    this.vm = new _Vue({
      data: {
        state: options.state,
      },
    });

    // 计算属性
    const getters = options.getters;
    this.getters = {};
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        },
      });
    });

    // mutations
    const mutations = options.mutations;
    this.mutations = {};
    Object.keys(mutations).forEach((key) => {
      this.mutations[key] = (payload) => {
        return mutations[key](this.state, payload);
      };
    });

    // actions
    const actions = options.actions;
    this.actions = {};
    Object.keys(actions).forEach((key) => {
      this.actions[key] = (payload) => {
        return actions[key](this, payload);
      };
    });
  }

  get state() {
    return this.vm.state;
  }

  commit = (mutation, payload) => {
    this.mutations[mutation](payload);
  };

  dispatch = (action, payload) => {
    this.actions[action](payload);
  };
};

export * from "./helper";
