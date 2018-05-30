var express = require('express');
var path = require('path');
var logger = require('morgan');
// Multer是Express官方推出的，用于Node.jsmultipart/form-data请求数据处理的中间件。
// Multer在解析完请求体后，会向Request对象中添加一个body对象和一个file或files对象（上传多个文件时
// 使用files对象 ）。其中，body对象中包含所提交表单中的文本字段（如果有）
// ，而file(或files)对象中包含通过表单上传的文件。
var multer=require('multer');
// dest 属性，这将告诉 Multer 将上传文件保存在哪。
// 如果你省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘
var uplaod=multer({dest:'uploads/'})
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 const route=require('./routes/index.js');
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

 
// view engine setup
//这一段基本无用
app.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers','Content-Type,X-Requested-With,Content-Length,Authorization,\'Origin\',Accept,Connection,User-Agent,Cookie');
    res.header('Access-Control-Allow-Credentials',true);
    res.header('X-Powered-By','3.2.1');
    res.header('Content-Type','application/json;charset=utf-8');
    if(req.method==='OPTIONS'){
    	res.sendStatus(200);
    }
    	else{
    		next();
    	}
    });
//设置VIEWS文件夹，__dirname是node.js里面的全局变量。取得执行js所在的路径
app.set('views', path.join(__dirname, 'views'));
//设置视图引擎
app.set('view engine', 'jade');
app.set('port', (process.env.port || 3000));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
////加载日志中间件，定义日志和输出级别
app.use(logger('dev'));
app.use(bodyParser.json());
 //加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: true }));
//加载解析cookie的中间件
app.use(cookieParser());
//静态文件目录设置,设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
route(app); //这句话位置是关键，不然跨域报错
//这部分可以不写
// app.use('/', index);
// app.use('/users', users);
// app.use('/articles',article);
// app.use('/comment',comment);
// catch 404 and forward to error handler
//捕获404错误，并转发到错误处理器
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 开发环境下的500错误处理器，将错误信息渲染error模版并显示到浏览器中
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get("port"),function(){
	console.log('GetData http://localhost:' + app.get('port'))
})
// app.use('/article',article);
// module.exports = app;
