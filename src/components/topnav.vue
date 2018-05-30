<template>
	<div class="topnav" ref="topnav">
		<!-- 因为topnav是home的组件，在home里面加上routerview所以这里就不用在渲染了？否则出现两个about.. -->
		<!-- 用fixed定位使得div固定不滚动 -->
		<div class="introduction" ref="introduction">
			<span class="sidebar myblog">earnest|个人博客</span>
			<ul class="sidebar Navcontainer" ref='ul_container'>
				<!-- 这里用routerlink样式失效 -->
				<li ref='content'><i class="iconfont up">&#xe62a;</i><router-link :to="{path:'/'}">首页</router-link></li>
				<li ref='about'><i class="iconfont up">&#xe60f;</i><router-link :to="{path:'/about'}">关于</router-link></li>
				<li ref='archives'><i class="iconfont up">&#xe60c;</i><router-link :to="{path:'/archives'}">归档</router-link></li>
			</ul>
			<ul class="sidebar out-wrper">
				<li class="link" style="margin-left: 10%">友链</li>
				<li class="wraper" style="border:none">
					<ul>
						<li><a class="iconfont" href="https://github.com/earnest1997" title="github">&#xe691;</a></li>
						<li><a class="iconfont" href="https://weibo.com/u/3388628710/home?wvr=5" title="weibo">&#xe66e;</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				input:'',
				activeIndex:1,
				mobile_flag:false
			};
		},
		watch:{
			'$route' (to, from ) {
			// NodeList 对象在某些方面和数组非常相似，看上去可以直接使用从 Array.prototype 上继承的方法。然而，除了forEach方法，NodeList 没有这些类似数组的方法,除此之外还有还有item，entries，keys和values方法。
			for(let i=0;i<this.$refs.ul_container.children.length;i++){
				this.$refs.ul_container.children[i].children[1].style.color=''
			} 
			if(to.path=='/content'){
				this.$refs.content.childNodes[1].style.color='#399bd7'
			}
			else if(to.path=='/about'){
				this.$refs.about.childNodes[1].style.color='#399bd7'
			}
			else{
				this.$refs.archives.childNodes[1].style.color='#399bd7'
			}	
		},
		mobile_flag:function(){
			let that=this
			if(this.mobile_flag){
				window.addEventListener("click",function(event){
                event.target.tagName==="img"?"":that.mobileView()
				},{once:true})
			}
			this.mobile_flag=false
		}
	},
	methods:{
		handleSelect(key,keypath){
			console.log(key, keyPath);
		},
		routerto(){
			this.$router.push({path:'https://www.cnkirito.moe/css/images/kirito_wechat.jpg'})
		},
		menu(){
			this.$refs.topnav.classList.add("navView")
			this.$refs.introduction.classList.add("navMobile")
			console.log(this.$refs.topnav.style.display)
			this.mobile_flag=true
		},
		mobileView(){
			console.log(233)
			this.$refs.topnav.classList.remove("navView")
			this.$refs.introduction.classList.remove("navMobile")
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss">

.topnav{
	width:20%;
	position: relative;
	z-index:99999999999;
}
*{
	margin:0;
	padding:0;
}
@media (max-width:768px){
	.topnav{
		display: none;
	}
	.introduction{
		background-size:cover;
	}
}
div.navMobile{
	width:18rem;
	height:100%;
}
div.navView{
	display: block;
}
.introduction{
	/*固定定位，包含块是视口，要是是绝对定位的话就是最近的定位元素的内边距边缘组成的*/
	position:fixed;
	top:0;
	left: 0;
	width:20%;
	height:100%;
	display: table;
	display: flex;
	display: -webkit-flex;
	-webkit-flex-direction:column;
	flex-direction: column;
	background-image: url("../assets/img/sidebar.jpg");
	background-position: top left;
	background-repeat: no-repeat;
	-webkit-transition: background-position 1s;
	/*background-size:cover;*/
	&:hover{
		background-position: top right;
	}
	
}
@mixin common {
	font-size:18px;
	&:hover{
		color:#FED629;
		cursor:pointer;
	}
	-webkit-transition:color 1s;
	-moz-transition:color 1s;
}
.Navcontainer{
	margin-top: 10%;
	box-sizing:border-box;
	-webkit-box-sizing: border-box;
	padding-left:30%;
}
.Navcontainer li{
	height:7rem;
	line-height: 7rem;
}
.Navcontainer li a{
	font-size:18px;
	display:inline-block;
	height: 7rem;
	line-height: 7rem;
	/*ease放松，在这表示慢速，ou就表示结束的时候慢速*/
	-webkit-transition:transform 2s ease-out;
}
.Navcontainer i{
	font-size:25px;
}
.sidebar{
	width: 100%;
	box-sizing:border-box;
	-webkit-box-sizing: border-box;
	padding-left:20%;
}
.out-wrper{
	margin-top: 5rem;
	li{
		margin-top:2%;
		font-size:18px;
		ul{
			height:3rem;
			padding-left: 1rem;
			box-sizing:border-box;	
		}
		ul li,ul a{
			width:35px;
			height:45px;
			line-height: 45px;
			margin-top: 2%;
			margin-right: 7%;
			float: left;
			color:#333;
		}
	}
}
.iconfont{
	font-size:35px;
	font-family: "iconfont";
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;

}
.myblog{
	@include common;
}
@font-face {
  font-family: 'iconfont';  /* project id 669684 */
  src: url('//at.alicdn.com/t/font_669684_k3v3seo5yu2138fr.eot');
  src: url('//at.alicdn.com/t/font_669684_k3v3seo5yu2138fr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_669684_k3v3seo5yu2138fr.woff') format('woff'),
  url('//at.alicdn.com/t/font_669684_k3v3seo5yu2138fr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_669684_k3v3seo5yu2138fr.svg#iconfont') format('svg');
}
</style>