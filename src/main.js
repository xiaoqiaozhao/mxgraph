// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import lodash from 'lodash'
import 'babel-polyfill' //解决360兼容模式打不开页面问题

import './assets/css/theme.less'
import './assets/css/custom.less'
import './assets/font/iconfont.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.use(iView)
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.matched.length === 0) {
    next('/');
  } else {
    next();
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
