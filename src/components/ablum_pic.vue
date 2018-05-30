<script type="text/javascript">
import {mapState,mapMutations} from 'vuex'
export default{
	props:['ablum_li'],
	computed: {
		...mapState(['view_flag'])
	},
	methods:{
		...mapMutations(['set_view']),
		change_view(){
			let img_arr=Array.from(this.$refs.img_div.childNodes)
			img_arr.forEach(function(item){
				item.className=""
				item.className="view_3d_child"
			})
			
			for(let i=0;i<img_arr.length;i++){
				// replace返回一个新的字符串
				let rotate_deg=i*(Math.floor(360/img_arr.length))
				console.log(rotate_deg)
				img_arr[i].style.setProperty("transform","rotateY("+rotate_deg+"deg) translateZ(22rem)");
				img_arr[i].style.setProperty("webkitTransform","rotateY("+rotate_deg+"deg) translateZ(22rem)");
			}
			this.$refs.img_div.className=""
			this.$refs.img_div.classList.add("view_3d")
			this.set_view()
			console.log(this.view_flag)
		},
		remove_view(){
			window.location.reload()		}
	},
	render:function(createElement){
		if(this.ablum_li.length){
			return createElement('div',{'class':{elrow:true},ref:'img_div'},this.ablum_li.map((item)=>{
				return createElement('img',{attrs:{title:item.description,src:item.src.match(/(?:\").*(?=\")/)[0].replace(/\"/,"")},'class':{img_pic:true},on:{mouseover:function(event){event.target.classList.add("img_hover")},mouseout:function(event){event.target.classList.remove("img_hover")},
					// ,click:function(event){event.target.parentNode.childNodes.forEach((item)=>{item.classList.toggle("img_active");item.classList.add("img_blur")})
			// toggle:第一个参数为要在元素中移除的类名，并返回 false。 
// 如果该类名不存在则会在元素中添加类名，并返回 true。 要是remove不存在的类名会报错
            // if(event.target.classList.contains("img_blur")){event.target.classList.remove("img_blur")}
            // event.target.parentNode.classList.remove("elrow_click")
            // event.target.classList.add("img_click","img_active")
            // console.log(event.target.classList)
            click:((event)=>{
            	this.$emit("scale",event.target.src)
            	event.stopPropagation()
            })
        }})	
			}))

		}
		else{
			return createElement('p',{'class':{no_pic:true}},'你还没有上传过照片哦')
		}

	}

}
</script>
<style type="text/css">
.elrow{
	margin-left:1rem;
	display: inline-block;
	max-width: calc(100% - 12rem); 
	/*描述元素的列数*/
}
.view_3d{
	width: calc(100% - 12rem);
	/*perspective 属性指定了观察者与z=0平面的距离,在css3中只有设置了perspective的值元素才会有Z轴，perspective为none元素则没有Z轴(就是2D元素)。*/
	/*perspective: 100rem;*/
	margin-left:1rem;
	display: inline-block;
	-webkit-transform-style: preserve-3d; 
	transform-style: preserve-3d; 
	position:relative;
	-webkit-transform:rotateX(55deg);
	transform:rotateX(55deg);
	animation:rotate_3d 15s ease-in-out infinite;
}
.view_3d_child{
	position: absolute;
	top:30%;
	left:30%;
	width:10rem;
	height: 10rem;
	-webkit-transform-origin:right;
	transform-origin:right;
	display: inline-block;
	/*第一个值是倒影位置，第二个值是倒影距离图片的间隔 第三个设置渐变，不能使用设置渐变的官方写法*/
	-webkit-box-reflect:below 0 -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));
	box-reflect: below 0 linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));

}
@keyframes rotate_3d{
	from{
		-webkit-transform:rotateY(0deg)
	}
	to{
		-webkit-transform:rotateY(360deg);
	}
}
/*.img_active{
	z-index: 100;
}
.img_blur{
	z-index: 2;
	}*/
	.img_hover{
		/*border:1px solid #000;*/
		border-radius: 6px;
	}
	.img_pic{
		max-width:18rem;
		min-width:16rem;
		height: 13rem;
		float: left;
		/*margin-left: 2rem;*/
	}
/*.img_click{
	-webkit-animation:scale 1s linear;
	animation:scale 1s linear;
	-moz-animation:scale 1s linear;
	-moz-animation-fill-mode:forwards;
	-webkit-animation-fill-mode:forwards;
	animation-fill-mode:forwards;
}
@keyframes scale{
	from{
		transform:scale(0);
		-webkit-transform:scale(0);
		-moz-transform: scale(0);
	}
	to{
		transform: scale(2);
		-webkit-transform:scale(2);
		-moz-transform: scale(2);
	}
	}*/
	@media screen and (max-width: 600px) {
		div.elrow{
			display: -webkit-flex;
			display: flex;
			-webkit-flex-direction:column;
			flex-direction:column;
			width:100vw;
			max-width: 100vw;
			-webkit-align-items:center;
			align-items:center;
			margin:0;
		}
		.img_pic{
			max-width:20rem!important;
		}
	}
/*@media (min-width:1200px){
	.elrow{
		column-count: 4!important;
	}
	}*/
	</style>