const express=require('express');
const mongoose = require('mongoose');
const config=require('./config');
const dataRoute=require('./data-route/dataRoute');




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





const app=express();
app.use(express.json());

app.use('/api/v1/application', dataRoute);

app.listen(process.env.PORT || 3001, function(){
		console.log('Server is avaiable and listening to port');

});
