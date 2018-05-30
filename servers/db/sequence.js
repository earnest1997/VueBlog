// 用于生成自增长的序列段，此处用于生成文章的aid
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/**
 * 存储ID的序列值
 */
SequenceSchema = new Schema({
    _id: String,
    next: Number
});
// statics用来添加方法，一般是给model添加方法？
// query是find的参数
SequenceSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

SequenceSchema.statics.increment = function (schemaName, callback) {
    return this.collection.findAndModify({_id: schemaName}, [],
    	// upsert：步骤1：查询判断满足条件的数据是否存在，
   // 步骤2：存在则更新，不存在则新增满足条件的。
        { $inc: { next: 1 } }, {"new":true, upsert:true}, callback); 
};

var Sequence = mongoose.model('Sequence', SequenceSchema);

module.exports = Sequence