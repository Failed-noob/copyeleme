import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css';

import { Indicator } from 'mint-ui';

Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

//请求拦截
axios.interceptors.request.use(config =>{
  // 加载动画
  // console.log('我尼玛正在请求');
  // console.log(Indicator)
  Indicator.open(
    {text:"loading..."}
  )
  return config
},err =>{
  return Promise.reject(err)
})


//响应拦截
axios.interceptors.response.use(response =>{
  Indicator.close();
  return response;
},err =>{
  Indicator.close();
  return Promise.reject(err)
})
new Vue({
  router,
  store,
  components: {
    Indicator
  },
  render: h => h(App)
}).$mount('#app')
