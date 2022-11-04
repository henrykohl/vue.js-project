/*eslint-disable*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

/* 自訂directive : 這裡使用箭頭函式與否，沒有影響。focus名稱可自行定義*/
Vue.directive("focus", {
  inserted: (el, binding, vnode, oldVnode) => {
    // this => ? 0.window 1.vue
    // console.log(this); /*undefined*/
    // console.log(el, binding, vnode, oldVnode);
    el.focus();
  },
  /* 測試update功能 */
  // update: (el, binding, vnode, oldVnode) => {
  //   console.log(el, binding, vnode, oldVnode);
  // },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
