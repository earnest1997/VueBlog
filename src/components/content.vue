<template>
	<div id="content" ref="content">
		<div class="search"><input type="text" name="search" placeholder="搜索一下" @keydown.enter="search(target)" v-model="target"></div>
		<div class="weather"><iframe  id="" width="280" height="1%" scrolling="no" frameborder="0" src="http://i.tianqi.com/index.php?c=code&id=34&icon=1&num=3" ref="weather"></iframe></div>
		<div class="wrap" ref="wrap">
			<ul v-for="item in short_articles" ref="ul" class="common_ul">
				<li>{{item.title}}</li>
				<li class="content_word">{{item.content}}</li>
				<!-- 别人写的aid其实就是_id,是自己取的名字 -->
				<!-- 这里是命名路由所以用params -->
				<li class="footer_"><p class="read_more"><router-link :to="{name:'article', params:{_id:item._id},hash:'#article'}">阅读更多</router-link></p><p>{{item.date}}</p></li>
			</ul>
		</div> 
		<isloading v-if="isload"></isloading>
		<p class="no_more" v-if="accomplish_flag">呀，没啦&nbsp😥</p>
	</div>
</template>
<script>
// 其他模块加载该模块(export default导出的)时，import命令可以为该匿名函数指定任意名字。
// import loading from './loading/vue'
import axios from 'axios'
import bus from './bus'
import isloading from './isloading'
import {_debounce} from '../js/util.js'
// import alert from '../assets/alert.js'
import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'
export default{
	data(){
		return{ 
			loading:false,
			isshow:false,
			show:false,
			show1:true,
			target:'',
			art_arr:[],
			scroll:null
		}
	},
	computed:{
		...mapState(["page","isload","accomplish_flag","allArticles","search_result","loginFlag"]),
		...mapGetters(["short_articles"]),
		finish:function(){
			return this.accomplish_flag
		}
	},
	watch:{
		finish:function(){
            console.log(this.accomplish_flag)
            this.accomplish_flag?this.$refs.content.removeEventListener("mousewheel",this.scroll):""
        }
    },
    components:{
      isloading
   },
  methods:{
      ...mapActions(["getallarticles","getPage"]),
      ...mapMutations(["remove_load","remove_accomplish_flag","set_research"]),
      search(target){
         this.art_arr=this.allArticles
        // 数组实例的find方法，用于找出第一个符合条件的数组成员
        this.art_arr=this.art_arr.filter(function(cur){
        	return cur.title.indexOf(target)!==-1
        })
        this.set_research(this.art_arr)
        this.$router.push('/search_result')
        // window.location.hash=`#${target}`
        
    }
},
created(){
	setTimeout(()=>{
		if(this.loginFlag){
			return
		}
		this.getallarticles({page:1,limit:5})
		this.getPage()
	},0)
	
},
beforeRouteEnter(to,from,next){
    next(vm=>{
       if(from.fullPath==="/login"){
           vm.$store.state.loginFlag=true
       }
   })
},
mounted(){
	let that=this
	this.scroll=_debounce(function(event){
		let ev=event||window.event
			// Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
			let top=that.$refs.wrap.getBoundingClientRect().bottom
			let height=document.documentElement.clientHeight||document.body.clientHeight
            //注意往下wheelDelta为负数
            if(top<height&&event.wheelDelta<0){
            	that.getallarticles({page:that.page,limit:5})
            }
        },300)
    	// 一定要记得同步代码先执行，并且下面的watchflag有没有监听不会自己变化，一开始是false之后也是f
    		// this.$refs.content.getBoundingClientRect().top=0在现代浏览器可写但是在旧版的只读
    		this.$refs.content.addEventListener("mousewheel",this.scroll)
    		//为了在数据变化之后等待vue完成更新dom
    	},
    	updated(){
    		let article_arr=this.short_articles
    		let that=this
    		console.log(article_arr)
    		article_arr.forEach(function(item,index){
    			that.$set(that.$refs.ul[index],"id",item.title)
    		})
    	}
    }
    </script>
    <style lang="scss">
    @import '../assets/css/common_ul.scss';
    .weather{
    	position: absolute;
    	right:.2rem;
    	top:2rem;
    }
    .search{
    	/*min-content只能用于width*/
    	position: relative;
    	top:1rem;
    	left:2rem;
    	display: inline-block;
    	margin-bottom: 2rem;
    	input{
    		/*绝对定位元素或者是固定定位元素形成bfc*/
    		position: relative;
    		top:0;
    		left:0;
    		border-radius: 1rem;
    		border:2px solid #707070;
    		width:4rem;
    		height:3rem;
    		padding-left: 2.7rem;
    	}
    	input:focus{
    		-webkit-animation:wider .6s;
    		animation:wider .6s;
    		-webkit-animation-fill-mode:forwards;
    		animation-fill-mode:forwards;
    	}
    	@keyframes wider{
    		from{
    			width:4rem;
    		}
    		to{
    			width:18rem;
    		}
    	}
    	@-webkit-keyframes wider{
    		from{
    			width:4rem;
    		}
    		to{
    			width:18rem;
    		}	
    	}
    }
    /*input不支持before伪元素*/
    .search:after{
    	content:'';
    	position: absolute;
    	left:0;
    	top:0;
    	width:3rem;
    	height:3rem;
    	background:url("../assets/img/search.png") no-repeat center;
    }
    @media (max-width: 768px){
    	.footer_{
    		top:calc(100% - 9rem);
    	}
    	div #content{
    		width: 86%;
    		margin-left:7%;

    	}
    	.weather{
    		display: none;
    	}
    	div.search:after{
    		width:2rem;
    		height: 3rem;
    		background-size: cover;
    		left:.2rem;
    	}
    	div.search input{
    		padding-left:2.1rem;
    	}
    }
    .no_more{
    	font-size:1.2rem;
    	width:100%;
    	height:3rem;
    	line-height: 3rem;
    	text-align: center;
    	margin-top:1rem;
    }
    *{
    	margin:0;
    	padding:0;
    }
    body,html{
    	background: #fff!important;
    }
    .page{
    	/*position:absolute;*/
    	margin-left:30%;
    	width: 70%;
    	height:5rem;
    	span{
    		font-size: 18px;
    		position: absolute;
    		&:hover{
    			cursor: pointer;
    		}
    	}
    	span:nth-child(1){
    		left:3%;
    		display:inline-block;
    		height:2rem;
    		line-height: 5rem;
    	}
    	span:nth-child(2){
    		right:15%;
    		height:2rem;
    		display: inline-block;
    		line-height: 5rem;
    	}
    }
    .wrap {
    	min-height: 51rem;
    	/*注意marginbottom不是本元素距离下一个元素的距离而是本元素到整个根元素底部的距离*/
    	/*指定每个p元素匹配父元素中的第2个子元素的背景色：*/
    }
    #content{
    	min-height: calc(100vh - 80px);
    	width: 70%;
    	margin-left:25%;
    	position:relative;
    	/*margin-top:4%;*/
    	/*这里的高度设置为100%跟绝对定位之后，高度是content的文档树的高而不是home文档树的，不设置绝对定位就是home文档树的*/

    }
    </style>