const express=require('express');
const routes=express.Router();
const dataUpload= require('../data-upload/dataUpload');
const dataModelUpdated= require('../data-model/dataModelUpdated');

const file=null;
routes.post('/data/upLoad', (req, res)=>{
	const {name}= req.body;
	const data= req.body.file;	
	file=data;
	const dataModelUpdate= new dataModelUpdated({name, data})
	dataModelUpdate.save().then((status)=>{
		console.log(status)

	}).catch((err)=>{
		console.log(err)
	})
})

//header ---->
routes.get('/columnName/:name', async (req, res)=>{
	const name=req.params.name
	console.log('req param')
	console.log(name)

	const obj= await getQQdata(name);

	//Promise.all(obj).then(data=>{
		res.json(obj)
	//})
})

const getQQdata= async (name)=>{

		const dataComplete=await dataModelUpdated.find({name}, {data: 1, _id:0})
		const headers= Object.keys(dataComplete[0]['data'][0])

		const data= dataComplete[0]['data']

		const headerType=  headers.map( (colName)=>{

			const value= data.map(item=>{
					return item[colName]
				})
			const distinct= [...new Set(value)]

			if(distinct.length >5 && typeof(distinct[0]) === 'number' && !colName.toLowerCase().includes('id')){
				//Numerical data
				return({
						qualitative: colName
					})
			}

			if(typeof(distinct[0]) === 'string' && !colName.toLowerCase().includes('name')){
				//catagorical
				return({
						quantitative: colName
					})
			}

			if(distinct.length <5 && typeof(distinct[0]) === 'number'){
			//catagorical
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

//wildcard column
routes.post('/data/colName', function(req, res){

	const {name,colName}=req.body;
	const a=["$$value", [`$$this.${colName}`]]

	const objA={$concatArrays: a}
	const objS={
		$reduce: {
			input: "$data",
			initialValue: [],
			in:objA
		}
	}

	const objColname= {};
	objColname[colName] = objS;


		dataModelUpdated.aggregate([
			   {
			   	$match: {name:name}
			   },
			   {
			      $project: objColname
			   }
			]).then((data)=>{
				const resData= data[0][colName]
				const newResData= resData.filter((item)=> item != null)
				const resObj={};
				resObj[colName]=newResData
				res.json(resObj)
			})
			
})

//bivariate bar graph
routes.post('/data/quantitative/bivariate', async (req, res)=>{
	const { colName1, colName2, name} = req.body;
	console.log('bivariate from server')
	console.log(colName1)
	console.log(colName2)

	const a1=["$$value", [`$$this.${colName1}`]]
	const objA1={$concatArrays: a1}
	const objS1={
		$reduce: {
			input: "$data",
			initialValue: [],
			in:objA1
		}
	}

	const objColname1= {};
	objColname1[colName1] = objS1;





	const dataColName1= await dataModelUpdated.aggregate([
		   {
		   	$match: {name:name}
		   },
		   {
		      $project: objColname1
		   }
		])
	const resDataColName1= dataColName1[0][colName1]
	const newResDataColName1= resDataColName1.filter((item)=> item != null)


	const colName1UniqueArray=[...new Set(newResDataColName1)]

	

	const finalData= colName1UniqueArray.map(async (item)=>{
		
		const queryArray=[`$$this.${colName1}`, item]

		const queryObj1=	{
				    $addFields: {
				      data: {
				        $filter: {
				          input: "$data",
				          cond: {
				            $eq: queryArray
				          }
				        }
				      }
				    }
				  }
	var finalResCol={};

	const match={};
	match['name']=name;

	const a2=["$$value", [`$$this.${colName2}`]]
	const objA2={$concatArrays: a2}
	const objS2={
		$reduce: {
			input: "$data",
			initialValue: [],
			in:objA2
		}
	}

	const objColname2= {};
	objColname2[colName2] = objS2;

		const dataColName2= await dataModelUpdated.aggregate([
		  {
		  	$match:match
		  },
		  queryObj1,
		  {
		      $project: objColname2
		   }
		])

		const resDataColName2= dataColName2[0][colName2]
		const newResDataColName2= resDataColName2.filter((item)=> item != null)

		const colNameUniqueArray2=[...new Set(newResDataColName2)]

		
		const resCol= colNameUniqueArray2.map( (item)=>{
			var countObj={};
			var count=0;
			newResDataColName2.forEach((value)=>{
				if(value === item){
					count=count+1;
				}
			})
			countObj[item]= count;

			return {...countObj}
		})
		finalResCol[item]= resCol;
		return {...finalResCol};
	})

	const finalResData = await Promise.all(finalData);
	res.send(finalResData);

})

//bivariate scatter plot
routes.post('/data/qualitative/bivariate', async (req, res)=>{
	const { colName1, colName2, name} = req.body;
	
	const a1=["$$value", [`$$this.${colName1}`]]
	const obj1={
		$reduce: {
			input: "$data",
			initialValue:[],
			in: {
				$concatArrays: a1
			}
		}
	}

	const a2=["$$value", [`$$this.${colName2}`]]
	const obj2={
		$reduce: {
			input: "$data",
			initialValue:[],
			in: {
				$concatArrays: a2
			}
		}
	}

	const queryObj= {
		$project:{
			array:[obj1, obj2]
		}
	}

	const match={};
	match['name']=name;


	const data= await dataModelUpdated.aggregate([
		{
			$match:match
		},
		queryObj
		])
	//const resData= data[0]['array']
	const xArray= data[0]['array'][0];
	const yArray= data[0]['array'][1];
	const colNameArray1={};

	const resData= xArray.map((item, index)=>{
		colNameArray1['x']=item;
		colNameArray1['y']=yArray[index];
		return { ...colNameArray1}
	})

	res.send(resData)

})

routes.post('/data/geographical', async (req, res)=>{

	const { colName1, name} = req.body;
	console.log('name')
	console.log(name)
	 //var country= `$data.${name}`
	 var sum=`$data.${colName1}`

	const data = await dataModelUpdated.aggregate([
	 	{$match:{
	 		name:name
	 	}},
	 	{$unwind: "$data"},
	 	{
	 		$group:{
	 			_id:'$data.country',
	 			Total:{
	 				$sum:sum
	 			}
	 		}
	 	}
	 	])

		console.log('value')
		console.log(data)
	
	var dataArray=[['Country', colName1]];
	data.forEach((item)=>{
		var value0= Object.values(item)[0]
		var value1= Object.values(item)[1]
		var value=[value0, value1]

		dataArray.push(value)
	})
	res.send(dataArray)

})

routes.post('/data/tableHeader', async (req, res)=>{
	console.log('new')
	const {name}=req.body;

	const data=await dataModelUpdated.aggregate([
		 {$match:{name:name}},
		 {$unwind:{path:'$data'}},
		 {$project:{
		 	_id:0,
		 	name:0,
		 	createdAt:0
		 }},
		 {$limit:1}
		]);

	const newData= data[0]['data'];
	const headers= Object.keys(newData)

	res.send(headers)
			
})

routes.post('/data/tableValue', async (req, res)=>{

const size=await dataModelUpdated.aggregate([
		 {$match:{name:'data.csv'}},
		 {$unwind:{path:'$data'}},
		 {$project:{
		 	_id:0,
		 	name:0,
		 	createdAt:0
		 }},
		 {$count: 'length'}
		]);

	const length=size[0]['length']

	const {name, startValue}=req.body;
	var stopValue=null;
	const limit=Math.trunc(length/4);

	if(startValue< limit){
		stopValue = startValue+4
	}
	else{
		stopValue=length;
	}

	console.log('start')
	console.log(startValue)

	console.log('stop')
	console.log(stopValue)

	const data=await dataModelUpdated.aggregate([
		 {$match:{name:name}},
		 {$project:{
		 	data: { $slice: [ "$data", startValue, stopValue ] },
		 	_id:0
		 }}
		 
		]);

	const newData= data[0]['data'];
	
	/*const vdata= newData.map((item)=>{
		var value= Object.values(item);
		return value
	})*/

	res.send(newData)
			
})

routes.post('/data/bivariareBoxPlot', async (req, res)=>{

		const {name, colName1, colName2 }= req.body;

		const queryColName1= `$data.${colName1}`;
		const queryColName2= `$data.${colName2}`;
		const query= `data.${colName1}`;



		const uniqueDataArray= await dataModelUpdated.aggregate([
			{$match: {name: name}},
			{$unwind: {path: '$data'}},
			{$project:{
				_id:0
			}},
			{$group: {_id: queryColName1}}
			])
		

		const uniqueData= uniqueDataArray.map((item)=>{
			return Object.values(item)[0]
		})

		const newUniqueData= uniqueData.filter((item)=> item != null)

		const resData= newUniqueData.map( async (item)=>{
			const resObj={};
			var newQuery={};
			newQuery[query] = item;
			const dataItemArray= await dataModelUpdated.aggregate([
				 {$match:{name: 'data.csv'}},
				 {$unwind: {path: '$data'}},
				 {$match: newQuery},
				 {$group: {_id: '$_id', list : {$push: queryColName2}}},
				 {$project: {
				 	_id:0
				 }}
				])

			const newDataRes= dataItemArray[0]['list']

			resObj[item]=newDataRes;
			return {...resObj}
		})

		const data= await Promise.all(resData)
		res.send(data)
	})

module.exports=routes;