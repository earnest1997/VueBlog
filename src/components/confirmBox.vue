<template>
	<div id="confirmBox" v-show="show">
		<div class="confirm">
			<div class="comfirm_msg">
				<slot></slot>
				<div class="selectCon">
					<p @click="makeSure()">确定</p><p @click="cancel()">取消</p>
				</div>
			</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
export default{
	name:"confirmBox",
	data(){
		return{

		}
	},
	props:["show"],
	methods:{
		makeSure:function(){
			this.$emit('update:show',false)
			this.$emit("makeSure")
		},
		cancel:function(){
			this.$emit('update:show',false)
		}
	}
}
</script>
<style type="text/css">
#confirmBox{
	top:0;
	left:0;
	bottom:0;
	right:0;
	position: fixed;
	z-index:10000000;
	background: rgba(0,0,0,.4);
}
.comfirm_msg{
	padding:2rem 1rem;
	width:15rem;
	margin:10rem auto;
	background: #fff;
	font-size:1.3rem;
	border-radius:.4rem;
	text-align: center;
	font-family:  "Comic Sans MS", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft Yahei", sans-serif;
	box-shadow: 0 0 10px hsla(0,0%,100%,.7);
}
.selectCon{
	display: flex;
	-webkit-justify-content:space-around;
	justify-content:space-around;
	margin:1rem 0rem 0rem;
	color:#2d97f8;
}
.selectCon p{
	cursor: pointer;
}
</style>