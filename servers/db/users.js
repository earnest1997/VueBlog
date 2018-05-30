var mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/blog',{useMongoClient: true})
// 记得这里要定义
var Schema=mongoose.Schema
// var Schema=mongoose.Schema;
var userschema=new Schema({
	// uid:{type:Number,index:{unique:true}}
	username:{type:String,unique:true},
	password:{type:String}
})
//注意用js的语法
var usermodel=mongoose.model('usermodel',userschema)
function initialiaze(){
	// 注意这里的promise首字母要大写
var p=new Promise(function(resolve,reject){
	var initialiazer=new usermodel({username:'kly',password:'12345'})
	initialiazer.save()
})
p.then(()=>{
	alert("初始化成功")
})
p.catch(()=>{
	alert("初始化失败")
})	
}
const db = mongoose.connection;
//数据库在第一次打开的时候初始化
db.once("open",initialiaze)
module.exports=mongoose.model('users',userschema)