const express=require ('express');
const router=express.Router();
const mongoose=require("mongoose")
const comments=require('../db/comments')
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
router.post('/api/postComment',function(req,res,next){
	const Comments={
		sayer:req.body.sayer,
		word:req.body.word,
		cid:req.body.cid,
		isMe:req.body.isMe,
		likeCount:req.body.likeCount
	}
	let comment=new comments(Comments)
	comment.save().then((doc)=>{
      res.send(doc)
	})
	.catch((err)=>{console.log(err)})
})
router.post('/api/GetComment',function(req,res,next){
	comments.find({cid:req.body.cid},(err,doc)=>{
		if(doc){
		 res.send(doc)
	}
	else{
		console.log(err)
	}
	})
})
router.post('/api/addLike',function(req,res,next){
	console.log(req.body.com_id)
	comments.update({_id:req.body.com_id},{$inc:{likeCount:1}},(err,doc)=>{
		if(err){
			console.log(err)
		}
		else if(doc){
			res.send(doc)
		}
	})
})
module.exports =router