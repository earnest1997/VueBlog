import Vue from 'vue'
import Router from 'vue-router'
// import topnav from '../components/nav'
import App from '../App.vue'
import home from '../components/home'
import about from '../components/about'
import archives from '../components/archives'
import content from '../components/content'
import login from '../components/login'
import editor from '../components/editor'
import manage from '../components/manage'
import admin from '../components/admin'
import user from '../components/user'
import ablum from '../components/ablum'
import article from '../components/article'
import loading from '../components/loading'
import search_result from '../components/search_result'
Vue.use(Router)
const router=new Router({
  	mode:'history',
  	routes: [
  	{
  		path: '/',
  		redirect:'/content',
  		component: home,
  		children:[
      //注意这里有逗号
      // 要是hash路由，这里无论点那个路由都是跳转到content
      {path:'/about', name:'about', component:about,meta:{keepAlive:false,scrollTop:true}},
      {path:'/archives',name:'archives',component:archives,meta:{keepAlive:false,scrollTop:true}},
      {path:'/content',name:'content',component:content,meta:{keepAlive:true}},
      {path:'/search_result',name:'search_result',component:search_result,meta:{keepAlive:false,scrollTop:true}},
      {path:'/article:_id',name:'article',component:article,meta:{keepAlive:false,scrollTop:true}}//这里的name是命名路由里面的参数name
      ]
  },
  {
  	path:'/login',name:'login',component:login
  },
  {
    path:'/loading',name:'loading',component:loading
  },
  {
  	path:'/admin',
  	name:'admin',
      //注意这里前面不要加上admin,因为user前面已经有一个了
      redirect:'/user',
      component:admin,
      children:[
      // 注意这里要加上“/”
      {path:'/user',name:'user',component:user,meta:{requireAuth:true}},
      {path:'/manage',name:'manage',component:manage,meta:{requireAuth:true}},
      {path:'/editor',name:'editor',component:editor,meta:{requireAuth:true}},
      {path:'/ablum',name:'ablum',component:ablum,meta:{requireAuth:true,keepAlive:true}}]
  }
  ]
  //无效
//   scrollBehavior (to, from, savedPosition) {
//   if (savedPosition) {
//     return savedPosition
//   } else {
//     return { x: 0, y: 0 }
//   }
// }
})
  router.beforeEach((to,from,next)=>{
  	// localstorage是window对象上的
    // document.documentElement.scrollTop=0
  	let token=localStorage.getItem("token")
  	if(to.meta.requireAuth&&token===null){
  		next({path:'/login'})
  	}
  	else{
  		next()
  	}
  })
  // 无效
//   router.afterEach((to,from,next) => {
//     alert(90993)
//     document.body.scrollTop=0
// })
export default router
