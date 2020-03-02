const mongoose=require('mongoose');

const DataSchema= new mongoose.Schema({
	name:{type: String,  require: true, lowercase: true},
	createdAt:{ type: Date, default:Date.now},
	data:{ type: Array, require: true, default:[]}
})

module.exports=mongoose.model('UpdatedDataModel', DataSchema);