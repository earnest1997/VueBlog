<template>
	<div class="admin">
		<div class="overlay"></div>
		<div class="adminnav">
			<div class="logout_box"> 
				<p>确定登出吗</p>
				<div class="btn1">确定</div>
				<div class="btn2">手滑了</div>
			</div>
			<el-menu  text-color="#fff" background-color="#545c64" class="el-menu-demo admin_nav" mode="horizantal" active-text-color="#ffd04b">
				<el-col :span=5 id=""><p class="el-menu-item hello" style="color:#fff;font-size: 1.3rem" ref="sayhello">{{time1}}{{name}}</p></el-col>
				<el-menu-item id="admin_Nav"><router-link to="/manage" index="1">文章</router-link></el-menu-item>
				<el-menu-item id="admin_Nav"><router-link to="/editor" class="amdin_item">新建</router-link></el-menu-item>
				<el-menu-item id="admin_Nav"><router-link to="/ablum" class="amdin_item">相册</router-link></el-menu-item>
				<el-menu-item id="admin_Nav"><router-link to="/user" class="amdin_item">账户</router-link></el-menu-item>
				<el-col :span="6" class="logout">
					<img src="../assets/img/logout.png" title="登出" @click="showBox()">
				</el-col>
			</el-menu>
		</div>
		<confirmBox :show.sync="show" v-on:makeSure="logout">确定登出吗</confirmBox>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</transition>
</template>
<script>
	import {mapMutations,mapState} from 'vuex'
	import axios from 'axios'
	import confirmBox from './confirmBox'
	export default{
		data(){
			return{
				username:"",
				password:"",
				name:'',
				localStorage:localStorage,
				show:false
			}
		},
		components:{
			"confirmBox":confirmBox
		},
		computed:{
			...mapState(['cancel_flag','confirm_flag']),
			time1:function(){
				let time=new Date().getHours()
				if(time>6&&time<12){

					return "早上好,"
				}
				else if(time>12&&time<18){

					return "下午好,"
				}
				else if(time==12){
					return "中午好,"
				}
				else{
					return "晚上好,"
				}
			}
		},
		mounted(){
			this.name=localStorage.getItem("token")
			var that=this
			$(function(){
				var hth=document.documentElement.clientHeight||document.body.clientHeight
				var h=hth+'px'
			// jquery创建元素
			var d=$("<div class='maple'>🍁</div>");
			setInterval(function(){
				// alert(4);
				// jQuery(window).height()代表了当前可见区域的大小当浏览器窗口大小改变时(如最大化或拉大窗口后) ，jQuery(window).height() 随之改变，但是jQuery(document).height()是不变的
				var wth=$(window).width();
				// var hth=$(window).height()
				var l=Math.random()*wth;
				// var t=Math.random()*hth
				var o=Math.random()+0.2;
				var deg=Math.random()*360;
				// $("p").css("color"),取得第一个段落的color样式属性的值
				// 注意这里获取变量的方式
				// 注意css方法里面属性不要加上双引号
				// 注意这里的rotate参数的写法
				$(d).clone().appendTo(".admin").css({left:l+"px",opacity:o,transform: "rotate(" + deg + "deg)"}).animate({
					top:"490px",
					// 有单位的值才要加上双引号
					opacity:0.1,
					left:"(l+20)+'px'",
				},1000,"linear",function(){  //注意这里的swing要加上双引号
					$(this).remove()
				})
			},1000);
		})
		},
		methods:{
			...mapMutations(['offline']),
			showBox(){
				this.show=true
			},
			logout(){
				this.offline()
				this.$router.push("/")
			}
		}
	}

</script>
<style lang="scss">
.btn1,.btn2{
	cursor: pointer;
}
.a_active{
	color:#399bd7;
}
#admin_Nav{
	padding:0rem 4rem;
}
.hello{
	margin-right: 20%!important;
	.el-menu-item{
		font-size:1.5rem!important;
	}
}
.admin_item{
	font-size: 1.4rem;
	color:#fff!important;
}
.admin{
	width: 100%;
	background: #fff;
	position: relative;
	min-height: 100vh;
}
.adminnav{
	width: 100%;
	height: 12%;
	border-bottom:1px solid #F5F8F9;
}
.el-menu-item{
	font-size:17px;
	/*color:#fff!important;*/
}
.maple{
	top:0;
	position: absolute;
	color:#ff0000; 
	font-size:2rem;
}
.overlay{
	display: none;
	z-index: 9999;
	opacity: 0.5;
	filter: alpha(opacity=50); /*ie*/
	position: fixed;
	top:0;
	left:0;
	background-color: #999999;
	width:100%;
	height:100%;
}
.logout{
	position:absolute;
	right:0;
	height: 100%;
	&:hover{
		cursor:pointer;
	}
	img{
		position: absolute;
		top:50%;
		right:2%;
		transform: translateY(-50%);

	}
}
.logout_box{
	border-radius: .6rem !important;
	position: fixed;
	width:23rem;
	height: 10rem;
	border-radius:.3px;
	left:35%;
	top:35%;
	background-color: #FFFFFF;
	z-index: 100000;
	padding-left:7rem;
	/*display: -webkit-flex;*/
	/*定义了项目在主轴上的对齐方式*/
	/*注意是设置在父容器上面的*/
	/*-webkit-justify-content:center;*/
	/*-webkit-flex-direction:row;*/
	p{
		font-size: 2.5rem;
		height:2.5rem;
		/*align-self:center;*/
	}
	/*:nth-child(n) 选择器匹配属于其父元素的第 N 个子元素，不论元素的类型。*/
	div:nth-child(2){
		font-size:1rem;
		/*align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性，基本跟alignitem一样
		align-items属性定义项目在交叉轴上如何对齐*/
		/*-webkit-align-self:flex-end !important;*/
		width:5rem;
		height:2rem;
		order:1;
		text-align: center;
		border-radius:1rem;
		position: absolute;
		left:20%;
		top:70%;
	}
	div:nth-child(3){
		font-size:1rem;
		order:2;
		width:5rem;
		height:2rem;
		text-align: center;
		border-radius:1rem;
		position: absolute;
		right:20%;
		top:70%;
		/*-webkit-align-self: flex-end;*/
	}
	border-top:1.5rem solid #00BFFF;
	display: none;
}
.admin_nav{
	display: flex;
	&:last-child{
		text-align:right;
	}
}
@media (max-width:768px) {
	#admin_Nav{
		padding:0 1rem;
	}
}
</style>