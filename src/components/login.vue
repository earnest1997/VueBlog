<template>
	<transition enter-active-class="animated fadeIn">
	<div id="login" v-cloak>
		<el-row type="flex" justify="center">
			<img src="../assets/img/coat.jpg" style="width:120px;height:120px">
		</el-row>
		<el-row type="flex" justify="center">
			<!-- <i class="usericon"></i> -->
			<el-input class="username" type="text" name="username" v-model="username" :span="5"></el-input>
		</el-row>
		<div id="line"></div>
		<el-row type="flex" justify="center">
			<!-- <i class="pasicon"></i> -->
			<el-input class="password" type="password" name="password" v-model="password" @keydown.enter="check()"></el-input>
		</el-row>
		<div id="line"></div>
		<el-row type="flex" justify="center">
			<el-row>
				<el-button @click="check()">login</el-button>
			</el-row>
		</el-row>
	</el-row>
</div>
</transition>
</template>
<script>
import {mapActions} from 'vuex'
export default{
	data(){
		return{
			username:'',
			password:'',
			inf:''
		}
	},
mounted(){
	document.documentElement.scrollTop=0
	document.body.scrollTop=0
	// console.log(document.body.scrollTop)
},
methods:{
	...mapActions(['login']),
			//这句话会让login像方法一样使用不用store.commit
			check:function(){
            	// 或运算符 ，当前面为真的时候，不会计算后面的，前面为假计算后面的
            	if(this.username==""||this.password==""){
            		alert("用户名，密码都不能为空")
            	}
            	else{
                //store实例已经注册到所有组件了
                // 注意这里首字母要小写
                this.login({username:this.username,password:this.password})
				// this.$store.dispatch("login",)
			}

		}
	}
}
</script>
<style>
*{
	border:none;
}
[v-cloak]{
	display: none;
}
#login{
	width: 260px;
	position: relative;
	margin:0 auto;
	top:10%;
}
.username,.password{
	width:260px;
}
#line{
	width:100%;
	height:30px;
}
</style>