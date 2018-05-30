const article=require('./article.js')
// const draft=require('./draft.js')
const comments=require('./comments.js')
const users=require('./users.js')
const ablum=require('./ablum.js')
module.exports=(app)=>{
	app.use(users)
    app.use(article)
    app.use(comments)
    app.use(ablum)
	// 
	// app.user(draft)
}
