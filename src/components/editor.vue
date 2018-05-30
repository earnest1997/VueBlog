<template>
	<div id="editor" style="height:100%;width:100%">
    <div class="container1">
      <input type="text" class="title" placeholder="文章标题" onfocus="this.placeholder=''" onblur="this.placeholder='文章标题'" v-model="title">
      <vue-editor v-model="content" class="editor"></vue-editor>
      <div class="select">
        <el-button round><a href="javascript:void(0)" @click="checkpost()">发布文章</a></el-button>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<style lang="scss">
.container1{
  position: absolute;
  left:17%;
  top:13%;
  display: grid;
  /*<!-- 创建十二列的表格，fr是剩余空间的等分单位 -->*/
  grid-template-columns:repeat(1,1fr);
  grid-template-rows:8% 80% 8%;
  grid-template-areas:
  "h"
  "m"
  "f";
  height: 100vh;
}
.editor{
  position: relative;
  grid-area: m;
  margin-bottom: 10px!important;
}
.title{
  width:50%;
  grid-area: h;
}
.title{
  margin-bottom:10px; 
  /* height:20px;*/
  font-size:1.2rem;
  font-family:微软雅黑;
} 
.select{
  width:100%;
  position: relative;
  margin-top: 20px;
  grid-area:f;
}
.ql-container {
  height:90%!important;
}
.alertbox{
  width: 32.5rem;
  height:10rem;
  border-radius:.5rem;
  z-index: 999;
  position: fixed;
  left:40%;
  top:30%;
  font-size: 40px;
  /*display flex不能跟display none写在一起*/
  /*display: -webkit-box;*/
  /*display:-webkit-flex;*/
  /*display:-webkit-flex;*/
  /*-webkit-flex-direction: row;
  -webkit-align-items: center;
  /*以下是设置盒子的子元素的位置，也就是里面的容器*/
  /*-webkit-justify-article content: center;
  flex-direction:row;
  justify-article content:center;
  align-items:center;*/
  text-align: center;
  /*verticalAlign 属性设置内容在元素框中的垂直对齐方式*/
  /*vertical-align: middle;*/
  background: #F6F6F6;
  display:none;
  p{
    height:10rem;
    line-height: 10rem;
  } 
}
@media (max-width: 768px){
  .container1{
    left:0%;
  }
}
</style>
<script>
  import axios from 'axios'
  import { VueEditor } from 'vue2-editor'
  import {mapMutations,mapActions,mapState} from 'vuex'
  export default{
   name:'editor',
   data(){
    return{
      content:'',
      title:'',
      date:'',
      editFlag:false,
      aid:""
    }
  },
  directives:{
    focus:{
      inserted:(el)=>{ //inserted是钩子函数：被绑定元素插入父节点时调用
        el.focus()
      }
    }
  },

  // 这意味着你不能使用箭头函数来定义一个生命周期方法(例如created: () => this.fetchTodos())。这是因为箭头函数绑定了父上下文，因此this与你期待的 Vue 实例不同，
  // 所有的生命周期钩子自动绑定this上下文到实例中
  // created:这个时候可以操作vue实例中的数据和各种方法，但是还不能对"dom"节点进行操作；
  // mouned:挂载完毕，这时dom节点被渲染到文档内，一些需要dom的操作在此时才能正常进行
  created(){
    // 这里的this是vue实例，export里面的内容都是vue实例的内容？
    if(this.$route.params._id){
      this.getArticle02({_id:this.$route.params._id})
    }
    else{
      // In option functions like data and created, vue binds this to the view-model instance for us, so we can use this.followed, but in the function inside then, this is not bound.
      // 在选项方法像data跟created，vue绑定了this到v-model，所以可以用this.,但是在它们里面的方法
      // this没绑定
      title:''
      article:''
    }
  },
  computed:{
    ...mapState(['article02']),
    Getarticle_flag:function(){
      return this.$store.state.article_flag
    }
  },
  components: {
    VueEditor
  },
  watch:{
   Getarticle_flag:function(){
    if(this.Getarticle_flag){
      this.title=this.article02.title
      this.content=this.article02.content
    }
    this.$store.state.article_flag=false
  }
},
mounted(){
  this.editFlag=this.$route.params._id?true:false
  this.aid=this.$route.params._id
  $(function(){
    var hth=$(document).height();
    $("body").css({"height":hth+"px","background-color":"#fffeef"});
  })
},
methods:{
  ...mapMutations(['postarticle']),
  ...mapActions(['getArticle02']),

  checkpost(){
    if(this.content==""||this.title==""){
      this.$toast("内容,标题都不能为空")
      return
    }
    var D=new Date()
    var year=D.getFullYear()
    var month=D.getMonth()
    var day=D.getDate()
    var date=`${year}年${month+1}月${day}日`
    var date1=D.getTime()
    if(!this.editFlag){
      axios.post("/api/postArticle",{title:this.title,content:this.content,date:date,sortBy:date1}).then((response)=>{
        this.$toast("发布成功");
      })
      .catch((err)=>{console.log(err);})
    }
    else{
      axios.post("/api/updateArticle",{title:this.title,content:this.content,date:date,sortBy:date1,_id:this.aid}).then((response)=>{
        this.$toast("发布成功");
      })
      .catch((err)=>{console.log(err);})
    }
  }
}
}
</script>
