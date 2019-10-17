import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Cookie from 'js-cookie';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from "vue-echarts";

import '../public/font/iconfont.css';
import '../public/font/iconfont.js';
// import './registerServiceWorker'

// 插件
import './plugins';

// 指令
import './directives';

// 过滤器
import './filters';

import Cube from 'cube-ui'

Vue.use(Cube);

Vue.use(ElementUI);

Vue.component("chart", ECharts);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.document.title = to.name;
  next();
});
