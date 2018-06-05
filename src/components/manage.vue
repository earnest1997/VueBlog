<template>
	<div class="manage">
		<div class="container2">
			<!-- align 属性规定 div 元素中的内容的水平对齐方式 -->
			<h1 class="allArticle" style="text-align:center">所有文章</h1>
			<div class="container3">
				<div class="manage_container">
					<ul ref="line" class="list" v-for="(item,index) in articles01">
						<li>{{item.title}}</li>
						<!-- 管道符使用过滤器 -->
						<li>{{item.date}}</li>
						<li class="icon_manage" @click="deleteArticle(item._id,index)" title="删除">&#xe608;</li>
						<li class="icon_manage" title="编辑" @click="edit(item._id)">&#xe61e;</li>
					</ul>
				</div>
				<div>
					<el-row class="list01"  type="flex" justify="space-around">
						<el-col :span="6">
							<el-button round @click="pre()">上一页</el-button>
						</el-col>
						<el-col :span="6">
							<el-button round @click="next()">下一页</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				page:1,
				limit:0,
			}
		},
		computed:{
			...mapState(['articles01','pagecount','cancel_flag']),
			cancel(){
				return this.cancel_flag
			}
		},
		watch:{
			cancel:function(){
				if(this.cancel_flag){
					this.$toast("删除成功")
				}
				this.remove_Cancelflag()
			}
		},
		created(){
			this.getPage({flag:true})
			this.getallarticles({page:1,limit:4})
		},
		methods:{
			...mapMutations(['remove_Cancelflag']),
			...mapActions(['getallarticles','remove','getPage']),
			pre(){
				if(this.page==1){
					this.$toast("已经是第一页了")
					return
				}
				else{
					this.page--
					this.getallarticles({page:this.page,limit:4})
				}
			},
			next(){
				if(this.page==this.pagecount){
					this.$toast("已经是最后一页了")
					return
				}
				else{
					this.page===0?this.page=1:""
					this.page++
					this.getallarticles({page:this.page,limit:4})
				}
			},
			edit(aid){
				this.$router.push({name:'editor',params:{_id:aid}})
			},
			deleteArticle(val,val01){
				this.remove({Id:val})
				this.getallarticles({page:this.page,limit:4})
			},

		}
	}
</script>
<style lang="scss">
span{
	cursor:pointer;
}
.container2{
	position: absolute;
	top: 15%;
	width:100%;
	text-align: center;
}
.allArticle{ 
	width:100%;
	font-weight: 700;
	font-size:1.2rem;
}
.container3{
	display: inline-block;
}
.manage_container{
 /*text-align: center;*/
 display: flex;
 -webkit-flex-direction:column;
 flex-direction:column;
 -webkit-align-items:center;
 align-items:center;
}
*{
	font-size: 1rem;
	font-family: 微软雅黑;
}
.icon_manage{
	font-size:1.8rem;
	font-family: "iconfont";
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;

}
.list{
	display:flex;
	display:-webkit-flex;
	-webkit-flex-direction:row;
	flex-direction:row;
	width:35rem;
	-webkit-justify-content:space-around;
	justify-content: space-around;
	margin-top: 2rem;
}
.list01{
    /*width:100vw;*/
	margin-top: 2rem;
}
.list li{
	flex-basis: 0%;
	flex-shrink: 0;
	height: 2rem;
	line-height: 2rem;
}
.list li:nth-child(1),.list li:nth-child(2){
	flex-grow: 5;
	text-align: center;
	
}
.list li:nth-child(3),.list li:nth-child(4){
	flex-grow: 1;
	cursor: pointer;

}
@font-face {
	font-family: 'iconfont';  /* project id 607326 */
	src: url('//at.alicdn.com/t/font_607326_kox0d8p2002uik9.eot');
	src: url('//at.alicdn.com/t/font_607326_kox0d8p2002uik9.eot?#iefix') format('embedded-opentype'),
	url('//at.alicdn.com/t/font_607326_kox0d8p2002uik9.woff') format('woff'),
	url('//at.alicdn.com/t/font_607326_kox0d8p2002uik9.ttf') format('truetype'),
	url('//at.alicdn.com/t/font_607326_kox0d8p2002uik9.svg#iconfont') format('svg');
}
@media (max-width:768px) {
	div.list01{
		width:100vw;
	}
}
</style>