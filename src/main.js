/*eslint no-debugger: 0*/
import Vue from "vue";
import App from "./App.vue";
import Vuex from "./vuex";
import * as types from "./mutationTypes";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    message: "hello vuex",
  },
  getters: {
    message: (state) => state.message,
  },
  mutations: {
    [types.CHANGE_MESSAGE](state, message) {
      state.message = message;
    },
  },
  actions: {
    uploadMessage(ctx, message = "using mini vuex") {
      console.log(`正在上传信息...`);
      setTimeout(() => {
        console.log(`上传成功`);
        ctx.commit(types.CHANGE_MESSAGE, message);
      }, 1000);
    },
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
