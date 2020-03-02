import { all, call} from 'redux-saga/effects';
import { getHeaderFromMongoDB, getQuantitativeDataOfWildcardColumnFromMongoDB, getQualitativeDataOfWildcardColumnFromMongoDB, getBivariateQuantitativeDataFromMongoDB, getBivariateQualitativeDataFromMongoDB, uploadUserDataToMongoDB, getGeographicalDataFromMongoDB, getTableHeaderFromMongoDB, getTableColumnFromMongoDB, getBivariateBoxPlotDataFromMongoDB} from './data/inBuildDataSaga';

export default function* rootSaga(){
	yield all([call(getHeaderFromMongoDB), call(getQuantitativeDataOfWildcardColumnFromMongoDB), call(getQualitativeDataOfWildcardColumnFromMongoDB), call(getBivariateQuantitativeDataFromMongoDB), call(getBivariateQualitativeDataFromMongoDB), call(uploadUserDataToMongoDB), call(getGeographicalDataFromMongoDB), call(getTableHeaderFromMongoDB), call(getTableColumnFromMongoDB), call(getBivariateBoxPlotDataFromMongoDB)])
}