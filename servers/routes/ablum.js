const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const ablum=require("../db/ablum.js")
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
router.post('/api/postImg',function(req,res,next){
	let new_img=req.body
	console.log(new_img)
	// Model.prototype.model()
	// Returns another Model instance.
	let new_ablum=new ablum(new_img)
	// save返回的是promise
	new_ablum.save().then((doc)=>{
    res.send(doc)
	})
	.catch((err)=>{
		console.log(err)
	})
})
router.post('/api/getAblum',function(req,res,next){
	ablum.find((err,doc1)=>{
		if(err){
			console.log(err)
		}
		else if(doc1){
			res.send(doc1)
		}
	})
})
// 下面是nodejs的语法

module.exports=router 