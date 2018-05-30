<template>
	<div id="home">
		<topnav ref="childMethod"></topnav>
		<div class="mobile_header" ref="mobile_header"><img src="../assets/img/menu.png" @click="nav()"><p>earnest的小站</p></div>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<div id="iconfont1" @click="gotop1()" v-show="show" title="回到顶部"></div>
		<myfooter></myfooter>
	</div>
</template>
<script>
import bus from './bus.js'
import topnav from './topnav'
import myfooter from './myfooter'
export default {
	name: 'home',
	components:{
		topnav,
		myfooter
	},
	mounted(){
		window.addEventListener("scroll",this.goup)
	},
	methods:{
		goup(){
			var cH=document.documentElement.clientHeight||document.body.clientHeight;
			 this.show=window.scrollY>cH
			},
			gotop1(){
				document.body.scrollTop=0
				document.documentElement.scrollTop=0
			},
			nav(){
				this.$refs.childMethod.menu()
			}
		},
		data(){
			return{
				show:false
			}
		}
	}
	</script>

	<style lang="scss">
	#home{
		width: 100%;
		/*position: relative;*/
	}
	.mobile_header{
		display: none;
		overflow: hidden;
	}
	.mobile_header img{
		vertical-align: middle;
		cursor:pointer;
		left:0;
		top:50%;
		-webkit-transform:translateY(-50%);
		transform:translateY(-50%);
		-moz-transform:translateY(-50%);
		position: absolute;
	}
	@media (max-width:768px){
		.mobile_header{
			display:block!important;
			height: 4rem;
			font-size:1rem;
			position: relative;
			background: url("../assets/img/sidebar.jpg");

		}
		.mobile_header p{
			display: inline-block;
			top:40%;
			position: absolute;
			left:50%;
			-moz-transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
		}
	}
	@font-face {
		font-family: 'iconfont';  /* project id 553263 */
		src: url('//at.alicdn.com/t/font_553263_g-90pc46nzflayvi.eot');
		src: url('//at.alicdn.com/t/font_553263_g-90pc46nzflayvi.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_553263_g-90pc46nzflayvi.woff') format('woff'),
		url('//at.alicdn.com/t/font_553263_g-90pc46nzflayvi.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_553263_g-90pc46nzflayvi.svg#iconfont') format('svg');
	}
	#iconfont1{
		background-image: url("../assets/img/rocket.png");
		top:-90%;
		left: 92%;
		position:relative;
		width:3.8rem;
		height: 3.8rem;
	}
	#iconfont1:hover{
		animation:jump 0.6s linear;
		-webkit-animation: jump 0.6s linear;
		-webkit-animation-fill-mode:forwards;
		animation-fill-mode: forwards;
		-webkit-animation-iteration-count:1;
		animation-iteration-count:1;
	}
	@keyframes jump{
		0%{
			transform:rotateZ(0deg);
			-webkit-transform:rotateZ(0deg);
			-moz-transform:rotateZ(0deg);
			-ms-transform:rotateZ(0deg);
			-o-transform:rotateZ(0deg);
		}
		50%{
			transform: rotateZ(45deg);
			-webkit-transform:rotateZ(45deg);
			-moz-transform:rotateZ(45deg);
			-ms-transform:rotateZ(45deg);
			-o-transform:rotateZ(45deg);
		}
		100%{
			transform: rotateZ(-60deg);
			-webkit-transform: rotateZ(-60deg);
			-moz-transform: rotateZ(-60deg);
			-ms-transform: rotateZ(-60deg);/*ie9*/
			-o-transform: rotateZ(-60deg);/*opera*/
		}
	}
	#iconfont1:hover{
		cursor:pointer;

	}
	@media (max-width: 768px){
		#iconfont1{
			left:86%;
			width:3rem;
			height: 3rem;
			background-size: cover;
		}
	}
	</style>
