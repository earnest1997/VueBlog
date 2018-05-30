let mongoose=require("mongoose")
let Schema=mongoose.Schema
let CommentSchema=new Schema({
	sayer:String,
	word:String,
	isMe:Boolean,
	cid:String,
	likeCount:Number
})
module.exports=mongoose.model("comments",CommentSchema)