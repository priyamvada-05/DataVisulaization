const fs = require('fs');
const master= require('papaparse');
const GenerateSchema = require('generate-schema');

var schema={};
var excel=null;

const file = fs.readFileSync('data.csv', 'utf8');
master.parse(file, {
	      header: true,
	      dynamicTyping: true,
	      complete: function(file) {
	      	excel=file
	      	schema = GenerateSchema.json(file.data[0])
	      	console.log(schema)
      }
    })

 module.exports= {schema, excel}