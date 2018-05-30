var mongoose=require("mongoose")
var Schema=mongoose.Schema
// schema是一个对象，构造他的实例
let ablumSchema=new Schema({
description:{type:String},
// schema的数据类型：
// Types:

// String
// Number
// Boolean | Bool
// Array
// Buffer
// Date
// ObjectId | Oid
// Mixed
src:{type:String}
})
module.exports=mongoose.model("ablum",ablumSchema)