const dataUpload= require('../data-upload/dataUpload');
const mongoose = require('mongoose');

schema=dataUpload.schema;

module.exports= mongoose.model('data',  new mongoose.Schema(schema.properties))