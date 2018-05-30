var mongoose=require('mongoose')
// var Sequnce=require('./sequence')
var Schema=mongoose.Schema
// 关于接口地址名字的定义问题，只要与前端的axios里面对应的接口名字保持一致就可以了，因为重点在于地址下面的代码
// 是怎么响应请求的，
// 保存到article，却从articles里面ssss取？下面响应请求的部分是db.article.find呀
let articleschema=new Schema({
	// aid:{type:Number,index:{unique:true}},
	title:{type:String},
	date:{type:String},
	//上下两种写法是等价的
	// comment_n:Number,
	content:String,
	sortBy:Number
})
// 生成从0开始自增长的文章aid
//pre串行中间件，一个接一个的执行，每个中间件调用next
// articleschema.pre('save', function(next) {
//     var self = this;
//     if( self.isNew ) {
//         Sequence.increment('article',function (err, result) {
//             if (err)
//                 throw err;
//             self.aid = result.value.next;
//             // 在aid增长之后再保存
//             next();
//         });
//     } else {
//         next();
//     }
// })
// 这个model的名字不是随便取的，会在数据库创建一个相对应的集合
// mongoose.connect('mongodb://127.0.0.1:27017/blog')

// const db = mongoose.connection

// db.on('error',console.error.bind(console,'Database connection error.'));
// db.once('open', () => {
//     console.log('The database has connected.')
 
// });

module.exports=mongoose.model('articles',articleschema)