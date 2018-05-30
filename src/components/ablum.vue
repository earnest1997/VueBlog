<template>
	<div class="ablum" ref="ablum" v-cloak>
		<div class="new_photo">
			<input class="new_" type="file" title="添加相册" ref="input_"/>
			<img src="../assets/img/new1.png" class="add_" accept=".jpg,.jpeg,.png"/>
		</div>
		<div class="dragon"><img src="../assets/img/dragon.png" title="切换浏览模式" @click="toggle_view"></div>
		<ablum_pic :ablum_li="ablum_list" v-on:scale="filter" ref="img_child"></ablum_pic>
	</div>	
</template>
<script type="text/javascript">
// 注意没有在vue实例里面注册它
import article  from './article.vue'
import axios from 'axios'
import ablum_pic from './ablum_pic'
import {mapState,mapMutations} from 'vuex'
export default{
	data(){
		return{
			ablum_list:[]
		}
	},
	created(){
		this.getAblum()
	},
	computed:{
		...mapState(['view_flag'])
	},
	components:{
		'ablum_pic':ablum_pic
	},
	methods:{
		...mapMutations(['set_view']),
		getAblum(){
			axios.post('/api/getAblum').then((response)=>{
    		// 记得data是一个数组
    		this.ablum_list=[]
    		for(let i=0;i<response.data.length;i++){
    			let img_obj={
    				description:response.data[i].description,
    				src:response.data[i].src
    			}
    			this.ablum_list.push(img_obj)
    		} 
    	})
			.catch((err)=>{
				console.log(err)
				this.$toast("服务器抽风啦ε=(´ο｀*)))")
			})
		},
		toggle_view(){
			console.log(this.view_flag)
			if(this.view_flag){
				this.$refs.img_child.remove_view()	
				this.set_view()
			}
			else{
				this.$refs.img_child.change_view()
			}
		},
		filter(o_src){
			this.$refs.ablum.style.filter="blur(3px) contrast(.8) brightness(.8)"
			let big_img=document.createElement("img")
			big_img.src=o_src
			big_img.className="big_img"
			this.$refs.ablum.parentNode.appendChild(big_img)
			this.$refs.ablum.onclick=(()=>{
				if(this.$refs.ablum.parentNode.contains(big_img)){
					console.log(big_img)
					this.$refs.ablum.parentNode.removeChild(big_img)
					this.$refs.ablum.style.filter=""
				}
			})
		}
	},	
	mounted(){
		let that=this
		// nexttick:如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise
		$(function(){
			$(".dragon").hover(function(){
				$(".dragon").addClass("animated bounce")
			},
			function(){
				$(".dragon").removeClass("animated bounce")
			})
			$(".new_").on("change",updateImageDisplay)
			function updateImageDisplay() {
				let sel_fil=that.$refs.input_.files
				let type=['image/jpg','image/jpeg','image/png']
				if(!sel_fil.length){
					that.$toast("没有选中任何图片")

				}
				else{
					if(!type.includes(sel_fil[0].type)){
						that.$toast("只能选择jpg,jpeg,png文件，请重新选择")
						return
					}
					let reader=new FileReader()
					if(sel_fil[0]){
						reader.readAsDataURL(sel_fil[0])
					}
					reader.addEventListener("load",function(){
						// let formdata=new FormData()
						let year1=new Date().getFullYear()
						let month1=new Date().getMonth()
						let day1=new Date().getDay()
						let now=`创建于${year1}年${month1}月${day1}日`
						// formdata.append("file",sel_fil[0])
						// formdata.append("description",now)
						// let config={
						// 	headers:{'Content-Type':'multipart/form-data'}
						// }
						let post_img={
							src:`<img src="${reader.result}"/>`,
							description:now
						}
                	// axios#post(url[, data[, config]])
                	axios.post('/api/postImg',post_img).then((response)=>{
                		console.log(response)
                	})
                	that.getAblum()
                },false)
				}
			}
		})		
	}
}
</script>
<style>
[v-cloak]{
	display: none;
}
.de{
	width:800px;
	height: 89px;
}
.big_img{
	width:38rem;
	height:25rem;
	position: fixed;
	left:50%;
	-webkit-transform:translateX(-50%);
	transform:translateX(-50%);
	top:30%;
	z-index: 900;
}
.dragon{
	position: fixed;
	left:90%;
	top:79%;
}
.dragon img{
	min-width: 8rem;
}
.ablum_ul{
	position: absolute;
	left: 13%!important;
	display: inline-block;
}
.ablum{
	width:90%;
	height: 100%;
	margin-left:5%;
	padding-top: 7%;
}
img:hover{
	cursor: pointer;
}
.new_photo{
	background-color: #dddddd;
	height: 12rem;
	width:8rem;
	position:relative;
	text-align: center;
	display: inline-block;
	vertical-align:top;
	/*vertical-align:top top
	元素及其后代的顶端与整行的顶端对齐。*/
	border:1px solid #fff;
}
.new_{
	width:48px;
	height: 48px;
	opacity: 0;	
	display: inline-block;
	-webkit-transform:translateY(-50%);
	transform:translateY(-50%);
	z-index: 100;
	left:30%;
	top: 50%;
	position: absolute;
}
.add_{
	/*left:30%;*/
	display: inline-block;
	width:3rem;
	height: 3rem;
	z-index:1;
	top:50%;
	position: relative;
	-webkit-transform:translateY(-50%);
	transform:translateY(-50%);
}
</style>