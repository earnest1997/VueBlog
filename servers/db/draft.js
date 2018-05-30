var mongoose=require('mongoose')
var draftschema=new Schema{
articletitle:{type:String},
	articleId:{type:Number,index:true}
	date:{type:Date},
	//上下两种写法是等价的
	comment_n:Number,
	articlecontent:String,
}
module.exports=mongoose.model('draftmodel',draftshema)