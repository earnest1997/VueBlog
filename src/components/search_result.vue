<template>
	<div id="search" ref="search_body">
		<div class="result_wrap" ref="wrap" v-if="search_result.length">
			<h1 class="search_count">找到了{{search_result.length}}篇文章</h1>
			<div class="research_list">
			<ul v-for="item in search_result" ref="ul" class="common_ul">
				<li>{{item.title}}</li>
				<li class="word search_content">{{item.content}}</li>
				<li class="footer_"><p class="read_more"><router-link :to="{name:'article', params:{_id:item._id},hash:'#article'}">阅读更多</router-link></p><p>{{item.date}}</p></li>
			</ul>
			</div>
		</div>
		<section class="notFound" v-else @click="de()">
			<h1 class="search_count">没有找到相关的文章哦😐</h1>
			<article class="search_dragon"></article>
		</section>
		<div class="search_right"></div>
	</div>
</template>
<script type="text/javascript">
import {mapState} from 'vuex'
export default{
	data(){
		return{
		}
	},
	computed:{
		...mapState(['search_result'])
	}
}
</script>
<style type="text/css">
@import '../assets/css/common_ul.scss';
.search_content{
	overflow:hidden;
	display:-webkit-box;
	text-overflow: ellipsis;
	-webkit-line-clamp:5;
	-webkit-box-orient: vertical;

}
.common_ul{
	width:auto !important;
}
.research_list{
	grid-area:main;
}
#search{
	width:100vw;
	min-height:67rem;
}
.result_wrap,.notFound{
	min-height:60rem;
	display: grid;
	grid-template-columns: 2fr 4fr 1fr;
	grid-template-rows:5rem 1fr;
	/*.表示空的网格单元*/
	grid-template-areas:
	". header ."
	"left main right";
}
.search_count{
	font-family: 微软雅黑;
	font-size:1.5rem;
	grid-area:header;
}
.search_dragon{
	grid-area:main;
	background: url("../assets/img/dragon.jpg") no-repeat top center;
}
.search_right{
	grid-area: right;
}
</style>