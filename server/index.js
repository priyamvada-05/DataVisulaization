const express=require('express');
const mongoose = require('mongoose');
const config=require('./config');
const dataRoute=require('./data-route/dataRoute');
const dataModelObj= require('./data-model/dataModel');
const path=require('path');


mongoose.connect(config.connection_string , {useNewUrlParser: true, useUnifiedTopology: true}).then((client)=>{

		//dataModel=client.model('data', new mongoose.Schema(schema.properties))
		// -------- Below is for saving data to MongoDB
		/*excel.data.forEach(row=>{
			
			const model=new dataModel(row);
			model.save(err=>{
				if(err){
					console.log(err)
				}
				console.log('data is saved to db')
			})
		})*/ 
		})





app=express();



app.use(express.json({ limit: '10MB' }));

app.use('/api/v1/application', dataRoute);
//app.use('/api/v1/application/upload', dataModelObj.routes);

const appPath=path.join(__dirname, '..', 'build');
app.use(express.static(appPath));

app.get('*', function(req, res){
		res.sendFile(path.resolve(appPath, 'index.html'));
});

app.listen(process.env.PORT || 3001, function(){
		console.log('Server is avaiable and listening to port');

});


