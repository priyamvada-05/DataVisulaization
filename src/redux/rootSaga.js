import { all, call} from 'redux-saga/effects';
import { getHeaderFromMongoDB, getQuantitativeDataOfWildcardColumnFromMongoDB, getQualitativeDataOfWildcardColumnFromMongoDB} from './data/inBuildDataSaga';

export default function* rootSaga(){
	yield all([call(getHeaderFromMongoDB), call(getQuantitativeDataOfWildcardColumnFromMongoDB), call(getQualitativeDataOfWildcardColumnFromMongoDB)])
}