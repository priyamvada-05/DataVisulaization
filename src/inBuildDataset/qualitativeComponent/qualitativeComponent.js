import React from 'react';
import './qualitativeComponent.scss';
import LineGraphComponent from '../../graphs/lineGraphComponentViaChartjs/lineGraphComponentViaChartjs';
import { connect} from 'react-redux';
import BoxPlotComponent from '../../graphs/boxPlotGraphViaChartjs/boxPlotComponent';

const QualitativeComponent = (props)=> {

	if(props.receivedQualitativeDataFromRedux && props.loadingData){
	const colName= props.colName;
	const quantitativeData= props.qualitativeData;


	return(
		<div className='container'>
		<div className='row'>
			<div className='col-md-6'>
			<div className='card'>
				<div className='card-body'>
				<h2>Line Chart</h2>
				</div>
				<div className='card-body'>
				<LineGraphComponent data={quantitativeData} />
				</div>
			</div>

			</div>

			<div className='col-md-6'>
			<div className='card'>
				<div className='card-body'>
				<h2>Box Plot</h2>
				</div>
				<div className='card-body'>
				<BoxPlotComponent data={quantitativeData} />
				</div>
			</div>

			</div>
		</div>
		</div>
		)
}

else{
	
	return null
}
}




const mapStateToProps= (rootReducer)=>{
	return({
		colName: rootReducer.inBuildData.qualitativeColName,
		qualitativeData: rootReducer.inBuildData.qualitativeData,
		loadingData: rootReducer.inBuildData.loadingQualitativeData,
		receivedQualitativeDataFromRedux:  rootReducer.inBuildData.receivedQualitativeData
	})
}



export default connect(mapStateToProps)(QualitativeComponent)