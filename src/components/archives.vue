<template>
	<div id="archives">
		<h1 class="animated bounceInRight headline">归档</h1>
		<div style="display:none">{{articles}}</div>
		<!-- 遍历函数的返回结果 -->
		<ul class="guidang" v-for="year in getyear()">
			<li class="year">{{year}}</li>
			<ul v-for="item in getyeararticles(year)">
					<li class="archives_tit" @click="read(item._id)">{{item.title}}</li>
			</ul>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import {mapActions,mapState} from 'vuex'
	export default{
		data(){
			return{
				years:[],
				d:3,
				isupdate1:0
			}
		},
		computed:{
			...mapState(['articles'])
		},
	// 记得初始化页面
	created(){
		// 
		// this.getyeararticles(),
		// 要显示很多文章的地方这一句都要加上
		this.getallarticles({page:0,limit:0})
		
	},
	// mounted(){
	// 	var H=
	// }
	beforeUpdate(){  //数据更新时调用，在这之前this.articles还没有被更改
		this.getyear()
	},
	updated(){
			if(this.isupdate1==0){
			 document.body.scrollTop=0
        document.documentElement.scrollTop=0	
			}
            this.isupdate1++
		},
	methods:{
		...mapActions(["getallarticles"]),
		read(aid){
			this.$router.push({name:"article",params:{_id:aid}})
		},
		getyear(){
			var map = Array.prototype.map
			 // map()方法返回一个新数组,数组中的元素为原始数组元素调用函数处理的后值
			 this.years=map.call(this.articles,function(x){
			 	return x.date.substring(0,10)// 与 slice() 和 substr() 方法不同的是，substring() 不接受负的参数
			 })
			 return [...new Set(this.years)]
			},
			getyeararticles(year){
				return [].filter.call(this.articles,(item)=>{
					if(item.date.match(eval('/'+year+'/'))){
						return true
					}

				})
			}
		}
	}
</script>
<style type="text/css" lang="scss">
.archives_tit{
	padding: 10px 15px;
	background: #fffbf0;
	margin-bottom: 5px;
	position: relative;
	filter:drop-shadow(1px 1px 2px #dddddd);
}
.archives_tit:after{
	position: absolute;
	width:0;
	height: 0;
	border:12px solid;
	top:50%;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	left:-24px;
	content:"";
	border-color: transparent #fffbf0 transparent transparent;
}
#archives{
	width: 70%;
	left: 25%;
	top:6%;
	min-height: calc(100vh - 80px);
	position: relative;
}
.year,.headline{
	color:#399bd7;
}
.headline{
	font-size:1.8rem;
}
.guidang li{
	font-family: 微软雅黑;
	height: 2rem;
	font-size: 1rem;
	line-height: 2rem;
	cursor:pointer;
}
.guidang .year{
	font-size: 1.3rem;
	height:2.5rem;
	line-height: 2.5rem;
}
@media (max-width:768px) {
	#archives{
		width:80%;
		left:10%;
	}
}
</style>