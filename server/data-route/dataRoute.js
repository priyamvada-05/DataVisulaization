const express=require('express');
const routes=express.Router();
const dataUpload= require('../data-upload/dataUpload');
const mongoose = require('mongoose');

routes.get('', function(req, res){

	schema=dataUpload.schema;

	const dataModel= mongoose.model('data',  new mongoose.Schema(schema.properties))
	dataModel.find({ }, { Account_Length: 1, Intl_Mins: 1, _id:0}).then(data=>{
			res.json(data);
	}).catch(err=>{
		console.log(err)
	})


})

routes.get('/columnName', (req, res)=>{

	var file= dataUpload.excel.meta.fields
	console.log('data')
	console.log(file)
	res.send(file)
})

module.exports=routes;