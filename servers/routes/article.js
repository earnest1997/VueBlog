const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const articles=require('../db/articles');

// 这部分要跟数据库交互，连接数据库
// 连接地址形式，只有host1，host1决定要链接的服务器地址，可以是一个hostname或者IP地址或者。。port可选。默认是27017
// 跟前面的mongodb：//是必须的，要是有usernamepassword，客户端会记录用这些凭证在连接mongod实例之后
// 当地址里面有usernamepassword的话，后面的/database就会认证授权凭证指定的数据库，要是没有dattabase就会认证admin数据库
// mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
mongoose.connect('mongodb://127.0.0.1:27017/blog',{useMongoClient: true})
mongoose.connection.on("connected", function () {
	console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
	console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
	console.log("MongoDB connected disconnected.")
});
// 连接数据库在model部分跟路由部分
//分页
router.post('/api/getallarticles',function(req,res,next){
	const page=req.body.page
	const limit=req.body.limit
	// 这里可以直接写date:1?
	articles.find().sort({sortBy:1}).limit(limit).skip((page-1)*limit).exec()
	.then((doc)=>{
	// res.send是从返回的数据中拿到的要返回到前台的数据，也就是前台需要用到的数据
	console.log(res.status)
	res.status(200).send(doc)
})
})
//加载文章
// 获取文章
router.post('/api/article01',(req,res,next)=>{
	const aid=req.body._id
	articles.findOne({_id:aid},(err,doc1)=>{
		if(err){
			console.log(err)
		}
		else if(doc1){
			res.send(doc1)
		}
	})
})
//获取编辑文章
router.post('/api/article02',(req,res,next)=>{
	const aid=req.body._id
	articles.findOne({_id:aid},(err,doc2)=>{
		if(err){
			console.log(err)
		}
		else if(doc2){
			res.send(doc2)
		}
	})
})
//发布文章
router.post('/api/postArticle',function(req,res,next){
	const article={
		title:req.body.title,
		content:req.body.content,
		date:req.body.date,
		sortBy:req.body.sortBy
	}
	const articles01=new articles(article)
	articles01.save()
	res.status(200).send("success")

})
//更新文章
router.post('/api/updateArticle',function(req,res,next){
	const aid=req.params._id
	const newTitle=req.params.title
	const newContent=req.params.content
	articles.update({_id:aid},
		{$set:{
        title:newTitle,
        content:newContent
	}}).then((doc5)=>{console.log(doc5)})
	res.status(200).send("success")
})
//删除文章
router.post('/api/deleteArticle',function(req,res,next){
	const aid1=req.body.Id
	console.log(aid1)
	const articles02=new articles({_id:aid1})
	articles02.remove().then((doc4)=>{
			res.send(aid1)
	})
	.catch((err)=>{console.log(err)})
	// async function remover(ID){
 //    let result1=await articles.findOne({_id:ID})
 //    let result2=JSON.parse(result1)
 //    let result3=
	// }
})
router.get('/api/getpage',(req,res,next)=>{
	articles.find(function(err,doc3){
		if(err){
			console.log(err)
		}
		else if(doc3){
			res.send(doc3)
		}
	})
})
//归档
// router.get('/archives',function(req,res,next){
// const articleresult=articlemodel.find().sort({datefiled:1})
// 	for(const i=0;i<articleresult.length-1;i++){
// 		const newarray=[];
// 		const sortlist=[];
// 		const x=0;
//      for(const j=i+1;j<articleresult.length;j++){
//      	if((!articleresult[i].date.getMonth()==articleresult[j].date.getMonth())||(!articleresult[i].date.getFullyear()==articleresult[j].getFullyear()))
//      		newarray=articleresult.slice(x,i);
//      		sortlist=sortlist.push(newarray);
//             x=i;
//      	}
//      }
//      return sortlist
// 	}
// })
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'))
db.once('open',() => console.log('Mongo connection successed'))
module.exports =router

