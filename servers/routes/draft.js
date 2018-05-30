var express=require("express")
var router=express.Router()
var mongoose="mongoose"
var Draft=require("../db/draft")
mongoose.connect('mongodb://127.0.0.1/admin',{useMongoClient: true})
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});
//保存为草稿
router.post('/draft',function(req,res,next){
	Draft(req.body).save(function(err){
		if(err){
			res.json({
			status:"1",
			msg:err.message,
		})
		}
	})
})
//草稿发布
router.post('/postdraft',function(req,res,next){
	var remover=new Promise function(resolve,reject){
		Draft.remove({aid:req.body.aid}
})
	}
	var saver=new Promise function(resolve,reject){
		Article(req.body).save()
	}
promise.all([Draft.remove(remover(),saver()])
.then(()=>{
	console.log("发布成功")
})
.catch((err)=>{
	console.log(err.message)
})
}
}
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'))
db.once('open',() => console.log('Mongo connection successed'))
module.exports =router








