<template>
<div class="animated bounceInDown vue-toast" v-show="isShow">
<p>{{tips}}</p>
</div>
</template>
<script>
export default {
 name:'toastCom',
 data () {
  return {
   tips: '',
   time: 3000,
   isShow:true
  }
 },
 mounted () {
  this.close()
 },
 methods: {
  close () {
   var that = this;
   setTimeout(function() {
    that.isShow = false
   }, this.time);
  }
 }
}
</script>
<style>
.vue-toast{
	width:20rem;
	height: 8rem;
	position: fixed;
	top: 20%; 
	left:40%;
	color:#000;
	font-size: 1.3rem;
	font-family: 微软雅黑;
	border-radius: 14px;
	text-align: center;
	display: flex;
	align-items: center;
	-webkit-align-items:center;
	-webkit-justify-content:center;
	justify-content: center;
	-webkit-flex-direction:column;
	flex-direction: column;
	padding-top: 0rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	background: #fff;
	box-shadow: 2px 2px 2px #ccc,
                -2px -2px 2px #ccc;
   filter:drop-shadow(0 0 2px #ccc);

}
</style>
