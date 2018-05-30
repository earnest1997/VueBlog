<template>
	<div id="myfooter">
		<el-row type="flex" justify="center">
			<p class="footer">Copyright @ 2017 KongLiYuan</p>
		</el-row>
		<el-row type="flex" justify="center">
			<p class="footer">Powered By Vue,Designedbyme|<router-link to="/login">站长登录</router-link></p>
		</el-row>
</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
	// <!-- 整个页面布局关键点：设置home组件的高为文档树的高度，之后将home组件设置为绝对定位，让他的子组件也设置定位 -->
</script>
<style lang="scss">
/* 以高度不变的元素为参照物，比如APP，将其最外层元素设置为高度不变，但是这样的话只能做到文档的高度会有一个最大限度，最外层元素必须高于这个最大限度 */
#myfooter{
	/*父盒子没有定位子盒子绝对定位也不一定从浏览器出发*/
	border-top:1px solid #DDDDDD; 
	width:70%;
	/*z-index 值不为 "auto"的 绝对/相对定位，会形成层叠上下文，要是固定定位的话，不设置z-index也会形成*/
	z-index: 90;
	position:relative;
	/* 因为设置了top100%所以这个组件被隔离在整个home组件的下面了*/
	/*这里不能设置top只能设置bottom*/
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
	left:25%;
	padding-top: 2%!important;

}
.footer{
	height:2rem;
	line-height: 2rem;
    width:100%;
    text-align: center;
}
@media (max-width:768px) {
	#myfooter{
	left:15%;
	}
}
</style> 