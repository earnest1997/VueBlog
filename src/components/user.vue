<template>
	<div id="user">
		<div v-show="false" style="width: 300px;height: 20px"></div>
		<div class="container">
			<div class="username_user">
				<input class="input" type="text" placeholder="请输入新的用户名" v-model="username" />
			</div>
			<div class="userpassword">
				<input class="input" type="password" name="password" placeholder="新密码" v-model="password"/>
			</div>
			<div class="userpassword">
				<input class="input" type="password" name="password1" placeholder="请再次输入新密码" v-model="password1"/>
			</div>
			<div class="reset" @click="postchange()">
				确认修改
			</div>
			<div class="alertbox">发布成功</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import {mapState,mapActions} from 'vuex'
export default{
	data () {
		return{
			username:"",
			password:"",
			password1:""
		}
	},
	// computed:{
		//mapstate返回的是一个对象，用扩展运算符将对象变成数组，如果是数组，将其变成参数序列
		 // ...mapState(['user'])
	// },
	methods:{
		...mapActions(['changeUser']),
		postchange(){
			var that=this
			let Promise1=new Promise(function(resolve,reject){
				if(!that.username.match(/^[A-Za-z\u4e00-\u9fa5]{1,8}$/)){
					const err="请输入1到8位的中文，字母"
					reject(err)
				}
				else{
					resolve()
				}
			})
			let Promise2=new Promise(function(resolve,reject){
				if(!that.password.match(/^[0-9]{6,9}$/)){
					const err1="请输入6到9位的数字"
					reject(err1)
				}
				else{
					resolve()
				}
			})
			let Promise3=new Promise(function(resolve,reject){
				if(that.password1!==that.password){
					const err2="两次密码输入不一致"
					reject(err2)
				}
				else{
					resolve()
				}
			})
			Promise.all([Promise1,Promise2,Promise3]).then(function(){
				that.changeUser({username:that.username,password:that.password})
			})
			.catch((err)=>{console.log(err);this.$toast(err)})
		}
	}
}
</script>
<style lang="scss">
#user{
	width:100%;
	display: flex;
	-webkit-justify-content:center;
	justify-content:center;
}
.error-wrap{
	color:#f00;
}
.input{
	border: none;
	width:100%!important;
	height: 20px;
	margin-top: 30px;
	background-color: #fff;
}
.username_user,.userpassword{
	border-bottom:1px #000 solid;
}
.container{
	position: absolute;
	width: 13rem;
	top:18%;
}
.reset{
	margin-top:10px;
	border-radius:20px;
	width:100%;
	height:30px;
	border:1px #000 solid;
	text-align: center;
	line-height: 30px;
	&:hover{
		background-color:#A0EED8;
		cursor: pointer;
	}
	-webkit-transition:background-color 2s;
	-moz-transition: background-color 2s;
}
.alertbox{
	display:none;

}
@media (max-width:768px) {

}
</style>