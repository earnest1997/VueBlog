<template>
	<div id="article">
		<div class="article_container">
			<p class="article_title">{{article.title}}</p>
			<p class="article_content" v-html="article.content"></p>
		</div>
		<div class="comment1">
			<div class="write">
				<p class="header" v-if="!comment.length">咋没人呢ε=(´ο｀*)，快来一起玩耍呀~</p>
				<p class="header" v-if="comment.length">留下你宝贵的评论，评论数共{{comment.length}}条</p>
				<div class="discuss_container">
					<ul class="discuss">
						<li v-for="(item,index) in comment">
							<div class="photo1" :class="{me:item.isMe}"></div>
							<p class="speak">{{item.sayer}}说:</p>
							<p class="word" v-html="emoji_comment[index]"></p>
							<div class="icon">
								<img class="reply" src="../assets/img/5.png" @click="reply(item.sayer)">
								<p ref="like" class="like iconfont" @click="like(index)" @mousedown="preventDefault(index)" :class="{red:likeArr.indexOf(index)!==-1}">&#xe6bb;</p>
								<!-- v-model通常用于表单组件的绑定，例如input，select等。它与v-text的区别在于它实现的表单组件的双向绑定，如果用于表单控件以外标签是没有用的。 -->
								<!-- {{}}是v-text的简写形式 v-text是用于操作纯文本，它会替代显示对应的数据对象上的值。当绑定的数据对象上的值发生改变，插值处的内容也会随之更新。注意：此处为单向绑定，数据对象上的值改变，插值会发生变化-->
								<p class="like_count" ref="like_count">{{item.likeCount}}</p>
							</div>
						</li>
					</ul>					
					<div class="footer-container">
						<div class="comment">
							<label for="评论">评论</label>
							<textarea class="comment_" type="text" name="comment" contenteditable="true" v-model="discuss" ref="com"></textarea><img src="../assets/img/emoji.png" class="emoji" title="插入表情">
						</div>
						<div class="name">
							<label for="昵称*">昵称*</label>
							<input class="name_" type="text" name="name" v-model="nickname" ref="nickname">

						</div>
						<div class="email">
							<label for="电子邮件*">电子邮件*</label>
							<input class="email_" type="text" name="email" v-model="emailAddress">

						</div>
						<div class="post" @click="say()">
							发表评论
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapState,mapGetters} from 'vuex'
export default{
	name:'article',
	data(){
		return{
			discuss:'',
			nickname:'999',
			emailAddress:'',
			aid:this.$route.params._id,
			localStorage:localStorage,
			ifred:true,
			isupdate:0
		}
	},
	updated(){
		if(this.isupdate==0){
			document.body.scrollTop=0
			document.documentElement.scrollTop=0	
		}
		this.isupdate++
	},
	mounted(){
		console.log(document.body.scrollTop)
		let token=localStorage.getItem("token")
		if(token){
			this.nickname=token
			this.isMe=!this.isMe
		}
		let that=this
		$(function(){
			let emoji_select
			$(".emoji").on("click",function(){
				if(emoji_select&&emoji_select.parent().is($(".footer-container"))){
					return
				}
				else{
					//必须要写在一行
					emoji_select=$('<div><img src="../../static/img/么么.png" data-src="么么"><img src="../../static/img/亲亲.png" data-src="亲亲"><img src="../../static/img/冷汗.png" data-src="冷汗"><img src="../../static/img/吃惊.png" data-src="吃惊"><img src="../../static/img/哈哈.png" data-src="哈哈"><img src="../../static/img/嘿嘿.png" data-src="嘿嘿"><img src="../../static/img/大哭.png" data-src="大哭"><img src="../../static/img/害怕.png" data-src="害怕"><img src="../../static/img/拽.png" data-src="拽"><img src="../../static/img/无语.png" data-src="无语"><img src="../../static/img/眨眼.png" data-src="眨眼"><img src="../../static/img/瞌睡.png" data-src="瞌睡"><img src="../../static/img/绝望.png" data-src="绝望"><img src="../../static/img/闭嘴.png" data-src="闭嘴"><img src="../../static/img/难过.png" data-src="难过"></div>')
					emoji_select.addClass("emoji_select")
					emoji_select.insertBefore(".name")
					let img_list=Array.from(emoji_select.children().get())     
					img_list.forEach(function(current){
						current.onclick=function(){
							let html=`[${current.dataset.src}]`
							that.discuss+=html
							that.$refs.com.focus()	
						}
					})
				}
			})
			$(".name_").on("focus",function(){
				if(emoji_select)
					emoji_select.remove()
			})
			$(".email_").on("focus",function(){
				if(emoji_select)
					emoji_select.remove()
			})
		})
				// localStorage.removeItem(this.$route.params._id)
			},
			computed:{
				...mapState(["article","comment","commentFlag"]),
				...mapGetters(["emoji_comment"]),
				likeArr() {
				// 这里只需要在挂载完成之后执行就可以了，因为需要读取保存的时候就是在每次
				// 刷新或者重新打开页面的时候，所以不需要监听而是用计算属性
				if(localStorage[this.$route.params._id]){
					console.log(99)
					return JSON.parse(localStorage[this.$route.params._id])
				}
				return []
			}
		},
		methods:{
			...mapActions(["getArticle","postComment","getComments","addLike"]),
			reply(name){
				this.discuss=`@${name}:`
				this.$refs.com.focus()
			},
			preventDefault(index){
				let arr02=this.$refs.like
				arr02=Array.from(arr02)
				arr02[index].onmousemove=function(event){
					let ev=event||window.event
					ev.preventDefault?ev.preventDefault():ev.returnValue=false
				}
			},
			like(index){
				let Arr=this.$refs.like_count
				Arr=Array.from(Arr)
				// let arrLike=Array.prototype.slice.call(localStorage[this.$route.params._id])
				if(!this.likeArr.includes(index)){
					[].push.call(this.likeArr,index)
					localStorage[this.$route.params._id]=JSON.stringify(this.likeArr)
					this.addLike({com_id:this.comment[index]._id,cid:this.aid})
					let cur_like=parseInt(Arr[index].textContent)+1
					Arr[index].innerHTML=cur_like.toString()
					console.log(Arr[index].previousSibling.previousSibling)
					Arr[index].previousSibling.previousSibling.classList.add("red")
				}
				else{
					this.$toast("最多只能点一个赞哦")
				}
			},
			say(){
				var that=this
				var promise1=new Promise(function(resolve,reject){
					if(!that.discuss==''){
						resolve();
					}
					else{
						const reason="内容不能为空";
						reject(reason);
					}
				});
				var promise2=new Promise(function(resolve,reject){
					if(!that.nickname.match(/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,8}$/)){
						const reason="昵称只能由1到8为中文，数字，字母组成";
						reject(reason);
					}
					else{
						resolve(this);
					}
				});
				var promise3=new Promise(function(resolve,reject){
					if(!that.emailAddress.match(/^[0-9]{6,11}@[a-z]{2}.com$/)){
						const reason="邮箱格式不对";
						reject(reason);
					}
					else{
						resolve();
					}
				});
				Promise.all([promise1,promise2,promise3]).then(function(a){

					that.postComment({sayer:that.nickname,word:that.discuss,cid:that.$route.params._id,isMe:that.isMe,likeCount:0})
//一定要记得回调函数是最后等其他的完成之后才开始执行的，所以then方法会先执行
setTimeout(function(){
	if(that.commentFlag){
		that.$toast("发表成功ヾ(◍°∇°◍)ﾉﾞ")
		that.getComments({cid:that.aid})
	}
},500)
})
				.catch((reason)=>{console.log(reason);this.$toast(reason)});
			}
		},
		// 每次刷新页面的时候该方法也会执行
		// beforeRouteEnter(to,from,next){
		// },
		created(){
			this.getArticle({_id:this.aid})
			this.getComments({cid:this.aid})
		}
	}
	</script>
	<style type="text/css">
	.discuss_container{
		margin-bottom: 5rem;
	}
	.discuss{
		width:80%;
		/*min-height:;*/
		display: inline-block;
	}
	.red{
		color:#f00!important;
	}
	.emoji:hover{
		cursor:pointer;
	}
	.discuss li{
		width:100%;
		height:100%;
		height:9rem;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction:row;
		-webkit-justify-content:center;
		justify-content:center;
		-webkit-align-items:center;
		align-items:center;
		border-top: 2px solid #000;
		position: relative;
	}
	.photo1{
		background-position: center;
		margin-left:2rem;
		/*-webkit-flex-grow:1;
		flex-grow: 1;*/
		width:5rem;
		height: 5rem;
		background-repeat: no-repeat;
		background-image: url('../assets/img/1.png');
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-flex-basis:5rem;
		flex-basis:5rem;
	}
	.emoji{
		position: absolute;
		bottom:1%;
		right:2%;
	}
	.emoji_select{
		/*display: -webkit-flex;
		display: flex;
		-webkit-justify-content:space-around;
		justify-content: space-around;
		-webkit-align-items:center;
		align-items: center;*/
		/*注意boxsizing也包括高度。。。注意这里的上下padding之和不要超过高度*/
		padding:1.5rem 1rem;
		margin:1rem 0;
		border:2px solid #399bd7;
		width:88.8%;
		position: relative;
		left:11.2%;
		box-sizing: border-box;
		height:8rem;
		border-radius: 6px;
		-webkit-box-sizing: border-box;
	}
	.emoji_select img{
		width:25px;
		height: 25px;
		float:left;
		margin:.3rem .4rem;
	}
	.me{
		background-image: url('../assets/img/2.png');
	}
	.icon{
		position:absolute;
		top:80%;
		left:77%;
		display: flex;
		display: -webkit-flex;
	}
	.icon img,.icon .like{
		cursor: pointer;
		margin-right: 1rem;
	}
	.icon img :hover,.icon .like:hover{
		cursor: pointer;
	}
	.iconfont{
		line-height: 25px;
		color:#000;
		font-size:25px;
		font-family: "iconfont";
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;

	}
	@font-face {
		font-family: 'iconfont';  /* project id 616781 */
		src: url('//at.alicdn.com/t/font_616781_kp3z3zkr9pwlv7vi.eot');
		src: url('//at.alicdn.com/t/font_616781_kp3z3zkr9pwlv7vi.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_616781_kp3z3zkr9pwlv7vi.woff') format('woff'),
		url('//at.alicdn.com/t/font_616781_kp3z3zkr9pwlv7vi.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_616781_kp3z3zkr9pwlv7vi.svg#iconfont') format('svg');
	}
	.icon .like{
		margin-right:2px;
	}
	.icon p{
		width:25px;
		height: 25px;
	}
	.word{
		/*margin-top:2rem;*/
		text-align: left;
		-webkit-flex-grow:12;
		flex-grow:12;
		/*align-self: flex-start;
		-webkit-align-self:flex-start;*/
		font-size:1rem;
	}
	.speak{
		-webkit-flex-grow:1;
		flex-grow:1;
		font-size:1.3rem;
		color:#399bd7;

	}
	*{
		margin:0;
		padding:0;
	}
	.article_title{
		font-size:1.6rem;
		font-family: 微软雅黑;
		text-align: center;
		margin:1rem 0;
	}
	.article_content{
		font-family: 微软雅黑;
		font-size: 1rem;
		text-align: left;
		text-indent: 1.2rem;
		/*letter-spacing: .3rem;*/
		/*单词之间的距离*/
		word-spacing: .3rem;
	}
	.article_container{
		position: relative;
		width:80%;
		left:10%;
	}
	#article{
		width:70%;
		position: relative;
		left:25%;
		min-height:calc(100vh - 5rem);
	}
	.footer-container{
		width: 60%;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-direction:column;
		flex-direction: column;
		-webkit-align-items:center;
		display: inline-block;
		position: relative;
	}
	.comment,.name,.email{
		display: flex;
		display: -webkit-flex;
		width:100%;
		margin-top: 2rem;

	}
	.comment{
		height: 6rem;
		line-height: 6rem;
		width:-webkit-calc(100%+32px)!important;
		width:-moz-calc(100%+2rem);
		width:calc(100%+2rem);
		position: relative;
	}
	.name{
		height:2.5rem;
		line-height: 2.5rem;
	}
	.comment1{
		width:100%;
		margin-top: 3rem;
		text-align:center;
	}
	.comment_,.name_,.email_{
		border:2px solid #736d6e;
		height: 100%;
		border-radius:6px;
		flex-shrink:1;
		-webkit-flex-shrink:1;
		position: relative;
		word-break: break-all;
		white-space: normal;/*中文换行*/	
		font-size:1rem;
	}
	.comment_{
		flex-grow: 5;
		-webkit-flex-grow:5;
	}
	.name_{
		flex-grow: 4;
		-webkit-flex-grow:4;
	}
	.email_{
		flex-grow:4;
		-webkit-flex-grow:4;
	}
	.email_{
		height:1.5rem;
	}
	.email label{
		line-height: 1.5rem;
		height: 1.5rem;
	}
	.comment_:focus,.name_:focus,.email_:focus{
		outline:none;
		border-color:rgb(57, 155, 215);
	}
	label{
		display: block;
		/*padding:1.5rem;*/
		font-size: 1.1rem;
		-webkit-flex-grow:1;
		flex-grow: 1;
		/*flex-basis:20%;*/
		flex-shrink: 0;
		/*-webkit-flex-basis:20%;*/
		-webkit-flex-shrink:0;
		text-align: left;
	}
	.write{
		width:100%;
		text-align: center;
	}
	.write .header{
		font-size:1.3rem;
		color:#399bd7;
		height: 4rem;
		line-height: 4rem;
		font-family: 微软雅黑;
	}
	.post{
		-webkit-align-self:flex-start;
		align-self: flex-start;
		height:2rem;
		line-height: 2rem;
		margin-top: 1rem;
		font-size:1rem;
		text-align: center;
		background-color:#bcccdf; 
		border-radius: 8px;
		padding: 0 3px;
		position: relative;
		width:4rem!important;
	}
	.post:hover{
		cursor: pointer;
	}
	.post:before{
        		/*width:0px;
        		height:0px;*/
        		content:'';
        		border-width:6px 20px;
        		border-style: solid;
        		border-color:#fff #fff #fff #bcccdf;
        		position: absolute; 
        		top:80%;
        		left:95%;
        	}
        	.post:after{
        		content: '';
        		border-width:6px 18px;
        		border-style: solid;
        		border-color:#fff ;
        		position: absolute;
        		top:99%;
        		left:95%;
        	}
        	@media(max-width:768px){
        		#article{
        			left:8%;
        			width:84%;
        		}
        		.write p.header{
        			font-size: 1rem;
        		}
        		label{
        			flex-grow:2;
        			-webkit-flex-grow:2;
        		}
        		.comment_,.name_,.email_{
        			width:100%;
        		}
        	}
        	</style>