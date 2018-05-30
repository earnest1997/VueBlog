let express=require('express')
let mongoose=require('mongoose');
//可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。
// 下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上
let router=express.Router();
let users=require('../db/users.js');

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
router.post('/api/login',(req,res,next)=>{
	//req.body,Contains key-value pairs of data submitted in the request body
	console.log(req.body)
	users.findOne({username:req.body.username,password:req.body.password},(err,doc)=>{
		console.log('doc',doc);
		if(err){
      // res.end();
          res.status(500).send('sorry')
      	}
      if(doc){
          console.log(4);
          res.json({username:doc.username});
        // }
      }
      // 注意这里不能写next（）
	})
})
//logout只要在前端清空用户信息即可
//修改用户信息
router.post('/api/changeUser',function(req,res,next){
    let params={
        username:req.body.username,
        password:req.body.password
    }
    // let User=new users()
    // users.update({})

    async function changeUser(){
      let user_info=await new Promise (function(resolve,reject){
        users.find((err,doc)=>{
        if(doc){
          console.log(doc)
          resolve(doc)
        }
        else if(err){
          reject(err)
        }
      })
      })
      console.log(user_info)
      // JSON.parse() 方法用于将一个 JSON 字符串转换为对象
      // 这里的userinfo是个对象组成的数组
      user_id=user_info[0]._id
      console.log(user_id)
      users.update({_id:user_id},params,(err1,doc1)=>{
        if(doc1){
          res.send("success")
        }
        else if(err1){
          console.log(err1)
        }
      })
    }
    changeUser()
  })


module.exports=router
