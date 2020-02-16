import { takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import {successfulGettingHeader, errorGettingHeader, successfulGettingQuantitativeDataWildcardColumn, errorGettingQuantitativeDataWildcardColumn, successfulGettingQualitativeDataWildcardColumn, errorGettingQualitativeDataWildcardColumn} from './inBuildDataAction';

export function* getHeaderFromMongoDB(){
	yield takeEvery('START_GETTING_HEADER_FROM_MONGODB', StartLoadinginBuildDataHeaderAsync)
}

function* StartLoadinginBuildDataHeaderAsync(){

	try{
		const response= yield fetch('/api/v1/application/columnName');
		const data= yield response.json();
		var qualitative=[];
		var quantitative=[];
		var cannot_define=[];
		
		data.forEach((item)=>{
			if(Object.keys(item)[0]==='qualitative'){
			 	qualitative.push(Object.values(item)[0])
			}
			else if(Object.keys(item)[0]==='quantitative'){
				quantitative.push(Object.values(item)[0])
			}

			else{
				cannot_define.push(Object.values(item)[0])
			}
			})

		
		yield put(successfulGettingHeader({qualitative: qualitative,
										   quantitative: quantitative,
										   cannot_define:cannot_define}))
	}

	catch(err){
		console.log('error from saga')
		console.log(err)
		yield put(errorGettingHeader(err))
	}
}

export function* getQuantitativeDataOfWildcardColumnFromMongoDB(){

	yield takeLatest('START_GETTING_QUANTITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB', startGettingQuantitativeDataOfWildcardFromMongoDBAsync)
}

function* startGettingQuantitativeDataOfWildcardFromMongoDBAsync({payload}){
	try{
		const response= yield fetch(`/api/v1/application/data/${payload}`);
		const data= yield response.json();
		yield put(successfulGettingQuantitativeDataWildcardColumn(data))
	}
	catch(err){
		yield put(errorGettingQuantitativeDataWildcardColumn(err))
	}
}

export function* getQualitativeDataOfWildcardColumnFromMongoDB(){

	yield takeLatest('START_GETTING_QUALITATIVE_WILDCARD_COLUMN_DATA_FROM_MONGODB', startGettingQualitativeDataOfWildcardFromMongoDBAsync)
}

function* startGettingQualitativeDataOfWildcardFromMongoDBAsync({payload}){
	try{
		const response= yield fetch(`/api/v1/application/data/${payload}`);
		const data= yield response.json();
		yield put(successfulGettingQualitativeDataWildcardColumn(data))
	}
	catch(err){
		yield put(errorGettingQualitativeDataWildcardColumn(err))
	}
}