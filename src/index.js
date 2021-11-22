import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'common/store';
import router from 'src/router.js';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import echarts from 'echarts'
require('echarts-gl');
require('echarts/lib/component/geo')
Vue.prototype.$echarts = echarts;


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import 'static/css/reset.css';
import 'static/css/common.css';

/*import Mock from './mock/mock';
Mock.mockData();*/
Vue.use(ElementUI)
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);

const app = new Vue({
  store,
  router
}).$mount('#app')



