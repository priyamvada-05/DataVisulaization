const express=require('express');
const routes=express.Router();
const dataUpload= require('../data-upload/dataUpload');
const dataModel= require('../data-model/dataModel');

routes.get('/data/:colName', function(req, res){

	const colName=req.params.colName;


		var colNameObj={};
		colNameObj[colName]=1;
		colNameObj['_id']=0;
		console.log(colNameObj)

		dataModel.find({ }, colNameObj).then(data=>{
				var colNameArray=[];
				var resColName={}
				data.forEach(item=>{
					colNameArray.push(item[colName])
				})
				resColName[colName]=colNameArray
				res.json(resColName);
		}).catch(err=>{
			console.log(err)
		})



})

routes.get('/columnName', async (req, res)=>{
	const obj= await getQQdata();

	Promise.all(obj).then(data=>{
		res.json(data)
	})
})

const getQQdata= async ()=>{

	var header= dataUpload.excel.meta.fields;

	const headerType= await header.map(async (colName)=>{
		var allHeader={};
		allHeader[colName]=1
		allHeader['_id']=0
		
		const data=await dataModel.find({ }, allHeader)
		
		const value=await data.map(item=>{
					return item[colName]
				})

		const distinct=await [...new Set(value)]
			if(distinct.length >7 && typeof(distinct[0]) === 'number' ){

				return({
						qualitative: colName
					})
			}

			else if(distinct.length < 7){

				return({
						quantitative: colName
					})
			}
			else{
				return({
						cannot_define: colName
					})
			}
				})


			

	return headerType
}

module.exports=routes;