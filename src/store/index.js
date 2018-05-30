import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//记得这种有自己index.js的插件下面这句话写在自己的index.js里面
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		cancel_flag:false,
		user:{
			username:'',
			password:''
		},
		view_flag:false,
		//初始化时用sessionstorage这样刷新页面就不用重新登录
	    // token:window.sessionStorage.getItem("token")
	    articles:[],
	    article:{},
	    pagecount:0,
	    pagecount1:0,
	    comment:[],
	    Id:'',
	    page:1,
	    commentFlag:false,
	    article_flag:false,
	    article02:{},
	    isloading:false,
	    isload:false,
	    accomplish_flag:false,
	    articles01:[],
	    allArticles:[],
	    search_result:[],
	    loginFlag:false
        // var user=dbconn.model('user’,userShema);
// 比如这个user存到Mongodb里就是users
// 集合名会被自动加上s
},
mutations:{
	set_research(state,payload){
		state.search_result=payload
	},
	set_view(state){
		state.view_flag=!state.view_flag
	},
	set_aid(state,payload){
		state.Id=payload
	},
	set_loading(state){
		state.isloading=true
	},
	stop_loading(state){
		state.isloading=false
	},
	set_load(state){
		state.isload=true
	},
	remove_load(state){
		state.isload=false
	},
	offline(state){
		state.user={}
		sessionStorage.removeItem("username")
	    	// var data=payload.username
	    	// state.token=null
	    	// window.sessionStorage.removeItem("token")
	    	// 而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。
	    	// 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话
	    },
	    set_page(state,payload){
	    	state.pagecount=Math.ceil(payload.length/4)
	    },
	    set_page1(state,payload){
	    	state.pagecount1=Math.ceil(payload.length/5)
	    },
	    add_page(state){
	    	state.page++
	    },
	    setuser(state,payload){                                                                             
        	// 将后面的原对象复制到目标对象
        	Object.assign(state.user,payload)
			//参数列表：name,value,end(gmt或者date对象,path,域名)
			sessionStorage.setItem("username","payload.username")
			// state.token=
			// sessionStorage.setItem("")
		},
		set_Articles(state,payload){
			// Object.assign(state.articles,payload.response)
			state.articles=[...state.articles,...payload]
		},
		set_article(state,payload){
			state.article=payload
		},
		set_article02(state,payload){
			state.article02=payload
		},
		set_flag(state,payload){
			state.cancel_flag=true
		},
		set_comment(state,payload){
			state.comment=payload
		},
		set_commentFlag(state,payload){
			state.commentFlag=payload
		},
		set_article_flag(state,payload){
			state.article_flag=true

		},
		remove_accomplish_flag(state){
			state.accomplish_flag=false
		},
		setAccomplish_flag(state){
			state.accomplish_flag=true
		},
		set_admArticles(state,payload){
			state.articles01=[...payload]
		},
		set_allArticle(state,payload){
			state.allArticles=[...payload]
		}
	},
	getters:{
		short_articles:state=>{
			// 一定要记得在这里return啊
			return state.articles.map(function(current){
				current.content=current.content.replace(/(<.*?>)/g," ")
				if(current.content.length>80){
					current.content=`${current.content.slice(0,80)}...`
				}
				let new_article={
					title:current.title,
					content:current.content,
					date:current.date,
					_id:current._id
				}
				return new_article
			})
		},
		emoji_comment:state=>{
			let com_arr=state.comment
			return com_arr.map(function(current){
				let emoji
		         if((current.word).match(/\[[\u4e00-\u9fa5]+\]/g))//返回值是数组：存放匹配结果的数组
		             //注意match每一个结果都是由input,index...组成的
		         { 
		         	// 注意这里中间要是匹配任意的字符串，这里的]会在字符串中最后的]才被匹配，
		         	// 而不是遇到]就停下，而且这里匹配中文的正则表达式不能直接写在匹配两个
		         	// 匹配[,]的中间，而是要写在括号表达式里面，因为他是正则表达式，要是直接用中文比如
		         	// 嘻嘻的话就不用
		         	emoji=(current.word).match(/\[[\u4e00-\u9fa5]+\]/g)
		         	emoji.forEach(function(now){
		         		let target_pos=target_pos=now.replace(/\[/,"")
		         		target_pos=target_pos.replace(/\]/,"")
			        // trim() 方法并不影响原字符串本身，它返回的是一个新的字符串
			        target_pos=target_pos.trim().substring(0,2)
			        // return target_pos
			        current.word=current.word.replace(now,"<img src='../../static/img/"+target_pos+".png'>")
			    })
		         	return current.word	
		         }
//replace返回值是一个新的字符串
			// return state.comment.word.replace('\[.*\]',`<img src='../../static/img/${{emoji}}.png'>`)
			else{
				return current.word
			}
			
		})
		}
	},
	actions:{
		postComment({commit},payload){
			axios.post('/api/postComment',payload).then((response)=>{
				if(response.status==200){
					commit('set_comment',response.data)
					commit('set_commentFlag',true)
				}
			})
			.catch((err)=>{console.log(err)})
		},
		getComments({commit},payload){
			axios.post('/api/GetComment',payload)
			.then((response)=>{
				if(response.status==200){
					commit('set_comment',response.data)
					console.log(response.data)
				}
			})
			.catch((err)=>{console.log(err)})
		},
		addLike({commit,dispatch},payload){
			axios.post('/api/addLike',payload)
			.then((response)=>{
				// dispatch("getComments",payload)
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		getPage({commit},payload){
			axios.get('/api/getpage').then((response)=>{
				commit('set_allArticle',response.data)
				commit('set_page',response.data)
			})
			.catch((err)=>{console.log(err)})
		},
		getallarticles({commit},payload){
			axios.post('/api/getallarticles', payload)
			.then((response)=>{
				commit('set_Articles',response.data)
				commit('set_admArticles',response.data)
				commit('add_page')
				if(response.data.length<payload.limit){
					commit('setAccomplish_flag')
				}
			})
			.catch((err)=>{
				console.log(err)
			})
			// let instance=axios.create()
		},
		getArticle({commit},payload){
			// 这里的params里面只有一个参数的时候不要加花括号
			axios.post('/api/article01',payload).then((response)=>{
				commit('set_article',response.data)
			})
			.catch((err)=>{
				alert(err)
			})
		},
		getArticle02({commit},payload){
			axios.post('/api/article02',payload).then((response)=>{
				commit('set_article02',response.data)
				commit('set_article_flag')
			})
			.catch((err)=>{
				alert(err)
			})
		},
		remove({commit},payload){
			axios.post('/api/deleteArticle',payload).then(
				(response)=>{
					// if(response.status==200){
						commit("set_flag")
					})
		},
		changeUser({commit},payload){
			axios.post('/api/changeUser',payload).then(
				(response)=>{
					if(response.status===200){
						commit("setuser")
						window.location.replace('./content')
					}
					else{
						alert("修改失败")
					}
				})
		},
		login({commit},payload){
			axios.post('/api/login',payload)
			.then((response)=>{
					// 请求成功则将用户信息保存到cookie
					if(response.status===200){
						// store.commit('setuser',response.username)
						// that.$router.push('/admin')
						window.location.replace("/manage")
						localStorage.setItem("token",response.data.username)
					}
					else{
						alert("用户名或密码错误")
					}
				})
			.catch((err)=>{
				console.log(err)
				alert("登陆失败")
			})
		}
	}
})
export default store
