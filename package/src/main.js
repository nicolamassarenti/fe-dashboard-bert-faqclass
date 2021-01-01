import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

global.config = require("./../config/config.json");

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
