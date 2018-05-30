<template>
	<div id="app">
		<!-- 不管写没写跟路由都在APP。vue里面？一定要加上这一句 -->
		<loading v-show="isloading"></loading>
			<router-view></router-view>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import home from './components/home.vue'
import loading from './components/loading.vue'
let EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(element,type,handler);
		}
		else if(element.attachEvent){
			element.attach(["on"+type],handler);
		}
	}
}
let resizeView="orientationchange" in window?"orientationchange":"resize"
function resizing(){
	document.body.style.fontSize=(document.documentElement.scrollWidth/1368)*16+"px"
}
window.addEventListener(resizeView,resizing,false)
export default{
	data(){
		return{

		}
	},
	components:{
		loading
	},
	computed:{
		...mapState(['isloading'])
	},
	methods:{
		changetitle(){
			if(document.hidden==true){
         		//document是文档树，title是其中的一个文档节点
         		document.title='去吧，皮卡丘';
         	}
         	else{
         		document.title='欢迎回来';
         	}
         }
     }
 }
 </script>
 <style lang="scss">
 #app{
 	width: 100%;
 	height:600px;
 	position:relative;
 	background: #fff!important;
 }
 /*@media all and (max-width:867px){
 	#app{

 	}
 	}*/
 	</style>
