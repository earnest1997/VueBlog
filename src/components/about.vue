<template>
	<div id="about" ref="about" v-top>
		<div class="about_sidebar">
			<img src="../assets/img/pig.png">
			<ul>
				<li><i class="icon_about">&#xe686;</i><i style="color:#399bd7">英文名:&nbsp&nbsp</i>earnest</li>
				<li><i class="icon_about">&#xe637;</i><i style="color:#399bd7">出生日期:&nbsp&nbsp</i>1997-12-12</li>
				<li><i class="icon_about" style="font-weight: 600;">&#xe8ab;</i><i style="color:#399bd7">籍贯：&nbsp&nbsp</i>湖南浏阳</li>
				<li><i class="icon_about">&#xe600;</i><i style="color:#399bd7">现居地：&nbsp&nbsp</i>湖北武汉</li>
				<li><i class="icon_about" style="font-weight: 600;">&#xe619;</i><i style="color:#399bd7">性格：&nbsp&nbsp</i>内敛含蓄</li>
				<li><i class="icon_about">&#xe679;</i><i style="color:#399bd7">喜欢的电影：&nbsp&nbsp</i>看不见的客人，星际穿越</li>
			</ul>
		</div>
		<ul class="about_wrap">
			<li class="animated bounce about_">关于</li>
			<li class="about_header" id="blog_introduce">博客简介</li>
			<li><p class="about_content">本博客计划每月更新三篇文章，内容涉及css,js,node.js,vue...</p></li>
			<li class="about_header" id="about_me">毕业院校</li>
			<li><p class="about_content">目前大三，就读于中南民族大学软件工程</p></li>
			<li class="about_header" id="job">求值意向</li>
			<li><p class="about_content">web前端实习生</p></li>
			<li class="about_header" id="skills">技能树</li>
			<li class="about_skill">
				<div class="html"><p>html</p></div>
				<div class="css"><p>css</p></div>
				<div class="js"><p>javaScript<br/>es6,es7</p></div>
				<div class="jq"><p>jquery</p></div>
				<div class="vue"><p>vue</p></div>
			</li>
			<li class="about_header" id="item_archives">项目经验</li>
			<li><p class="about_content1 about_item1">&nbsp番茄钟&nbsp&nbsp<i class="iconfont">&#xe65f;</i></p></li>
			<li><p class="about_content1 about_item2">&nbsp个人博客&nbsp&nbsp<i class="iconfont">&#xe65f;</i></p></li>
			<li><p class="about_content1 about_item3">&nbspCss动画demo&nbsp&nbsp<i class="iconfont">&#xe65f;</i></p></li>
			<li><p class="about_content1 about_item4">&nbsp一些静态网页&nbsp&nbsp<i class="iconfont">&#xe65f;</i></p></li>
			<li class="about_header" id="books">读过的书</li>
			<li>
				<ul class="about_reading">
					<li><p class="about_content about_books">○&nbsp&nbspJavaScript高级程序设计</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspJavaScript权威指南</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspCss揭秘</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspJavaScript设计模式</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspHTML5 css3权威指南</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspJavaScript语言精粹</p></li>
					<li><p class="about_content about_books">○&nbsp&nbsp你不知道的JavaScript上卷</p></li>
					<li><p class="about_content about_books">○&nbsp&nbsp图解HTTP</p></li>
					<li><p class="about_content about_books">○&nbsp&nbsp高效前端：Web 高效编程与优化实践</p></li>
					<li><p class="about_content about_books">○&nbsp&nbspJavaScript设计模式与开发实践</p></li>
				</ul>
			</li>
			<li class="about_header" id="study_temple">学习历程</li>
			<li><p class="about_content learn_process">一开始是看w3c的教程，之后是菜鸟教程，对HTML跟css有了
				大概的了解，但是没有深入，尤其是css,之后开始在网上看视频教程，在css方面有了一点小突破，但是当时陷入一种长期看视频不动手的状态，导致效率及其低下，渐渐的抛弃看视频模式开始试着做些静态网页，期间遇到了很多css的问题，会通过看书跟看网上的博客解决，后来开始接触js,试着做些基础的轮播图等等，网上的博客给予了我很大的帮助，其中收获最大的是阮一峰的es6教程跟js教程，渐渐形成了一种边看书边做些小demo的形式学习，在项目中遇到bug解决之后都会将其记录下来，在阅读书籍方面，JavaScript设计模式这本书给予了我面向对象编程的启蒙。。此外还关注了很多微信公众号，每天闲暇的时候都会看看
			在解决问题这方面，我一般都是自己先思考，不懂得查阅资料，实在解决不了的时候会去一些技术群或者starkoverflow等网站上面寻求答案</p></li>
			<li class="about_header" id="self_comments">个人介绍</li>
			<li><p class="about_content selfCom">上进心较强，对web前端有着浓厚的兴趣，闲暇的时候喜欢听音乐，看电影，平时会看看技术博客或者微信公众号充充电。虽然感觉前端的学习是一个很漫长的过程，而且自己完全是靠自学，很多东西都只能靠度娘，有时会因为一个BUG浪费太多的时间，打击学习编程的积极性。
				但是当bug解决的时候，又很享受这种乐趣，今年的我即将步入工作岗位，很期待能够进入一个能够锻炼自己的公司，有一个能够让我跟前辈一起进步的平台。
			虽然现在的我目前能力还欠缺，但是每天都在一点一点的进步，2018，希望是一个收获之秋!</p></li>
		</ul>
		<img src="../assets/img/list.png" class="about_pos" @click="browse()">
		<ul class="about_poslist" ref="about_poslist">
			<h2>文章目录</h2>
			<li>○&nbsp&nbsp<a href="#blog_introduce">博客简介</a></li>
			<li>○&nbsp&nbsp<a href="#about_me">个人介绍</a></li>
			<li>○&nbsp&nbsp<a href="#job">求值意向</a></li>
			<li>○&nbsp&nbsp<a href="#skills">技能树</a></li>
			<li>○&nbsp&nbsp<a href="#item_archives">项目经验</a></li>
			<li>○&nbsp&nbsp<a href="#books">读过的书</a></li>
			<li>○&nbsp&nbsp<a href="#study_temple">学习历程</a></li>
			<li>○&nbsp&nbsp<a href="#self_comments">自我评价</a></li>
		</ul>
	</div>																					
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		directives:{
			top:{
				inserted:function(el){
					setTimeout(function(){
						document.body.scrollTop=0
						document.documentElement.scrollTop=0
					},0)
				}
			}
		},
		methods:{
			browse(){
				window.getComputedStyle(this.$refs.about_poslist,null).display==="none"?this.$refs.about_poslist.style.display="block":this.$refs.about_poslist.style.display="none"
			}
		},
		mounted(){
			$(function(){
				$(".about_sidebar>img").click(function(){
					window.getComputedStyle($(".about_sidebar>ul").get(0),null).display==="none"?$(".about_sidebar>ul").slideDown("slow"):$(".about_sidebar>ul").slideUp("slow")
				})
				let bubble=$("<div>我藏好了哟</div>")
                  bubble.get(0).className="about_bubble"
                  bubble.addClass("animated jello")
                  bubble.appendTo(".about_sidebar")
				$(".about_sidebar>img").hover(function(){
                  window.getComputedStyle($(".about_sidebar>ul").get(0),null).display==="none"?
                  bubble.fadeIn("slow"):""
				},
				function(){
					setTimeout(function(){
						$(".about_bubble").fadeOut("slow");
					},1500)
				})
			})
		}
	}
</script>
<style lang="scss">
.icon_about{
	font-size:2rem;
	font-family: "iconfont";
	font-style: normal;
	color:#333333;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
    display: inline-block;
    margin-right: .5rem;
}
@font-face {
  font-family: 'iconfont';  /* project id 666801 */
  src: url('//at.alicdn.com/t/font_666801_xtug6mie1dbihpvi.eot');
  src: url('//at.alicdn.com/t/font_666801_xtug6mie1dbihpvi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_666801_xtug6mie1dbihpvi.woff') format('woff'),
  url('//at.alicdn.com/t/font_666801_xtug6mie1dbihpvi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_666801_xtug6mie1dbihpvi.svg#iconfont') format('svg');
}
.about_poslist{
	background: #fbf6f6;
	z-index: 100000000;
	position: fixed;
	display: none;
	bottom:4rem;
	right: 3rem;
	width:12rem;
	padding: 0 1rem;
	height:18rem;
	border-radius: 8px;
	box-shadow:2px 2px 2px #ccc,
	-2px -2px 2px #ccc;
	font-family: 微软雅黑;
	color:#399bd7;
	li{ 
		text-align: center;
		font-size: 1rem;
		line-height:2rem;
		height: 2rem;
		cursor: pointer;
		a{
			color:#399bd7;
		}
	}
	h2{
		width:inherit;
		font-weight: 700;
		font-size:1.3rem;
		text-align: center;
	}

}
.about_sidebar{
	position: absolute;
	right:0;
	top:2rem;
	width:20rem;
	text-align: center;
	img{
		cursor: pointer;
	}
	ul{ 
		display: none;
		text-align: left;
		background: url("../assets/img/paper.jpeg") no-repeat center;
		background-size:cover;
		box-shadow:0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
	}
	ul li{
		font-size:1.1rem;
		font-family: 微软雅黑;
		line-height: 2.1rem;
		padding:1rem;
	}
}
.about_skill{
	width:20rem;
	height: 20rem;
	clip:rect(0rem 20rem 20rem 10rem);
}
.about_bubble{
	width:10rem;
	height:6rem;
	background: #dddddd;
	text-align: center;
	position: absolute;
	top:0;
	left:-10%;
	border-radius: .6rem;
	font-size:1.5rem;
	font-family: 微软雅黑;
	line-height: 6rem;
	display: none;
}
.about_bubble:after{
	content:'';
	position:absolute;
	left:100%;
	bottom:0px;
	width:16px;
	height:16px;
	border-width:0;
	border-style:solid;
	border-color:transparent;
	border-top-width:10px;
	border-top-color:currentColor;
	border-radius:0 32px 0 0;
	color:#dddddd;
}
.about_reading{
	position: relative;
	background: #deab8a;
	padding:1rem;
	width:40rem;
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
	border-radius: .5em;
	background: linear-gradient(-150deg,transparent 1.5em,#deab8a 0); 
	background: -webkit-linear-gradient(-150deg,transparent 1.5em,#deab8a 0); 
}
.about_reading::before{
	content:"";
	position: absolute;
	top:0;
	right:0;
	background: linear-gradient(to left bottom,transparent 50%,rgba(0,0,0,.2) 0,rgba(0,0,0,.4)) 100% 0 no-repeat;
	background:-webkit-linear-gradient(to left bottom,transparent 50%,rgba(0,0,0,.2) 0,rgba(0,0,0,.4)) 100% 0 no-repeat;
	width:1.73em;
	height: 3em;
	transform-origin:bottom right;
	-webkit-transform-origin:bottom right;
	border-bottom-left-radius: inherit;
	box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
}
@font-face {
	font-family: 'iconfont';  /* project id 664099 */
	src: url('//at.alicdn.com/t/font_664099_z63la6suypvte29.eot');
	src: url('//at.alicdn.com/t/font_664099_z63la6suypvte29.eot?#iefix') format('embedded-opentype'),
	url('//at.alicdn.com/t/font_664099_z63la6suypvte29.woff') format('woff'),
	url('//at.alicdn.com/t/font_664099_z63la6suypvte29.ttf') format('truetype'),
	url('//at.alicdn.com/t/font_664099_z63la6suypvte29.svg#iconfont') format('svg');
}
@mixin bingCommon($rotateChild,$topChild,$leftChild) {
	width:inherit;
	height: inherit;
	border-radius:100%;
	position: absolute;
	clip:rect(0rem 10rem 10rem 0rem);
	p{
		font-size:1.4rem;
		position: absolute;
		top:$topChild;
		left:$leftChild;
		transform: rotate($rotateChild);
		-webkit-transform: rotate($rotateChild);
	}
}
.html{
	@include bingCommon(-80deg,30%,9%);
	background:#f47920;
	-webkit-transform: rotate(80deg);
	transform: rotate(80deg);

}
.css{
	@include bingCommon(-160deg,30%,20%);
	-webkit-transform: rotate(160deg);
	transform: rotate(160deg);
	background:#f7acbc;
}
.js{
	@include bingCommon(-240deg,20%,13%);
	-webkit-transform: rotate(240deg);
	transform: rotate(240deg);
	background: #b2d235;
}
.jq{
	@include bingCommon(-330deg,37%,6%);
	-webkit-transform: rotate(330deg);
	transform: rotate(330deg);
	background: #f05b72;
}
.vue{
	@include bingCommon(-360deg,30%,20%);
	-webkit-transform: rotate(360deg);
	transform: rotate(360deg);
	background: #4e72b8;
}
.about_pos{
	position:fixed;
	right:1.5rem;
	bottom:1.5rem;
	opacity: 1;
}	
.about_content{
	font-size:1.3rem;
	font-family: 微软雅黑;
	text-indent:1rem;
	line-height: 2rem;
}
.about_content1{
	font-size:1.1rem;
	line-height: 1.5rem;
	font-family: 微软雅黑;
	position: relative;
	margin-left: 2rem;
}
.about_content1::after{
	content:"";
	height:1px;
	top:120%;
	left:0;
	position: absolute;
	background: #ccc;
	width:80%;
}
@mixin aboutItem {
	position: absolute;
	top:0;
	left:-2rem;
	font-size:1rem;
	padding:.3rem .6rem;
	border-radius: 4px;
}
.about_item1::before{
	@include aboutItem;
	content:"1";
	background: #7fb80e;
}
.about_item2::before{
	@include aboutItem;
	content:"2";
	background: #d7e345;
}
.about_item3::before{
	@include aboutItem;
	content:"3";
	background: #f58220;
}
.about_item4::before{
	@include aboutItem;
	content:"4";
	background: #fedcbd;
}
.about_header{
	color:white;
	font-size:1.5rem;
	font-weight:bold;
	text-shadow: 0 1px hsl(0,0%,85%),
	0 2px hsl(0,0%,80%),
	0 3px hsl(0,0%,75%),
	0 5px hsl(0,0%,65%),
	0 5px 10px black;
}
.learn_process{
	/*-webkit-gradient() 是老式写法*/
	-webkit-mask-image:-webkit-linear-gradient(45deg, #000, #f00 50%, #090);
}
.about_picture{
	width:28rem;
	height: 33rem;
	border:2px solid #a0d9f6;
	overflow: hidden;
	position: absolute;
	top:2rem;
	left:68%;
	/*background: url("../assets/img/me.jpg") no-repeat center;*/
}
#about{
	width: 70%;
	left:25%;
	min-height: 100vh;
	position: relative;
	top:6%;
}
.about_wrap li{
	margin-bottom:5%;
	/*p{
		font-size: 18px;
		}*/
	}
	.about_{
		font-size:1.9rem;
	}
	@media (max-width:768px) {
		#about{
			width:86%;
			left:7%;
		}
		.about_sidebar{
			display: none;
		}
		.about_reading{
			width:inherit;
		}
	}
</style>