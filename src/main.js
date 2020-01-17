// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import http from './http';
import store from './store/index';
import router from './router/index';
import Root from './Root.vue';
import axios from 'axios'
import qs from 'qs'

import $ from 'jquery';

// 引入公共样式表
import 'normalize.css';
import 'animate.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ECharts from 'vue-echarts/components/ECharts.vue'

// 引入需要的echarts如表
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title.js'

import dateformat from 'dateformat'
import formatDate from '@/utils/utils'

require('src/assets/styles/variable.scss');
require('src/assets/styles/base.scss');
require('src/assets/styles/common.scss');
require('src/assets/styles/iconfont.css');

Vue.component('chart', ECharts);

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$qs = qs
Vue.prototype.$http = axios

axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(resp => {
  return resp.data
}, err => {
  const res = err.response
  const errors = {
    code: res.status,
    exception: res.data.exception,
    message: res.data.message
  }
  return Promise.reject(errors)
})

/* eslint-disable no-new */

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = http;


new Vue({
  el: '#app',
  store,
  router,
  template: '<Root/>',
  components: { Root }
});
