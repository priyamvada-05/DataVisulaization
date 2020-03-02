const express=require('express');
const routes=express.Router();
const dataUpload= require('../data-upload/dataUpload');
const mongoose = require('mongoose');
const GenerateSchema = require('generate-schema');
var Schema = mongoose.Schema;


app=express();


app.locals.collectionName='data';
app.locals.schema=dataUpload.schema;
app.locals.file=dataUpload.excel;


/*routes.post('/data/upLoad', (req, res)=>{
	const {name}= req.body;
	app.locals.file= req.body.file;

	app.locals.schema = GenerateSchema.json(app.locals.file[0]);
	app.locals.collectionName = name;
	var userSchema = new Schema(app.locals.schema.properties);
	var dataModel= mongoose.model(app.locals.collectionName,  userSchema);
	var status='';
	app.locals.file.forEach(row=>{
			
			const model=new dataModel(row);
			model.save(err=>{
				if(err){
					console.log(err)
				}
				status='data is saved to db';
			})
		})
	app.locals.model= mongoose.model(app.locals.collectionName, userSchema)
	res.send({status})	
})*/




module.exports= {
				model:app.locals.model,
				routes: routes,
				schema: app.locals.schema,
				excel: app.locals.file
			}