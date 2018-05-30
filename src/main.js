// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../element-variables.scss'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.scss'
import '../static/css/animate.css'
import axios from 'axios'
import $ from 'jquery'
import Toast from './toast'
import mavonEditor from 'mavon-editor'
import VeeValidate, { Validator } from 'vee-validate'
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(ElementUI)
Vue.use(mavonEditor)
// Vue.use(infiniteScroll)
Vue.use(VeeValidate)
// Vue.use(Vuex)
//将 axios 改写为 Vue 的原型属性,这样在其他的组建中也可以使用axios
Vue.prototype.$ajax=axios
let http = require("http");
// 指定将被用在各个请求的配置默认超时时间
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout=2000
axios.interceptors.request.use(function(config){
// setTimeout(function(){
	// console.log(config.url=='/api/getpage'||config.url=='/api/getallarticles')
	// 优先级比较运算符高于布尔，布尔运算符高于?:
if(config.url=='/api/getallarticles'||config.url=='/api/getpage'){
     store.commit("set_load")
}
else{
	config.url=='/api/addLike'||config.url=='/api/GetComment'?"":store.commit("set_loading")
}
// },1000)
// 这句不能省，不然读不到配置参数后面的请求无从发起
return config
},function(err,response){
	this.$toast(err)
	return Promise.reject(err)
})
axios.interceptors.response.use(function(config){
if(config.config.url=='/api/getallarticles'||config.config.url=='/api/getpage'){
     store.commit("remove_load")
}
else{
config.config.url=='/api/addLike'||config.config.url=='/api/GetComment'?"":store.commit("stop_loading")
}
return config
},function(err){
	if(err.response)
	{
		console.log(err.response)
	let err_status=err.response.status;
	 switch (err_status) {
	 	// mesage是err对象的属性
	 	case 500:
	 	err.message='网络连接失败';
	 	break;
	 	case 404:
	 	err.message='请求出错';
	 	break;
	 	case 401:
	 	err.message='未授权，请重新登录';
	 	break;
	 	default:err.message='出错啦⊙﹏⊙';
	 }
	}
	// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
	// 所以这里的err会传到axios的catch里面
	return Promise.reject(err)
})
new Vue({   //根实例
  el: '#app',
  router,
  store,
  data:{
  	bus02:new Vue()
  },
  template: '<App/>',
  components: { App }
})
