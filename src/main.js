import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './components/css/global.css'
import axios from 'axios'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// Vue.config.productionTip = false;
// axios.defaults.baseURL = apiConfig.baseUrl;
axios.defaults.baseURL = 'http://120.26.172.98:8080/QASystem/'
// axios.interceptors.request.use(config=>{
//   console.log(config)
//   return config
// })
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = false;


// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.config.productionTip = false

//这是一个Vue实例
new Vue({
  router, //把路由挂载到了vue实例上
  render: h => h(App) //通过render()函数，将App根组件渲染到页面上
}).$mount('#app')
