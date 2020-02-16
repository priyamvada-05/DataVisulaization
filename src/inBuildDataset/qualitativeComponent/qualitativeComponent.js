import React from 'react';
import './qualitativeComponent.scss';
import LineGraphComponent from '../../graphs/lineGraphComponentViaChartjs/lineGraphComponentViaChartjs';
import { connect} from 'react-redux';

const QualitativeComponent = (props)=> {

	const colName= props.colName;
	const quantitativeData= props.qualitativeData;



	

	return(
		<div className='quantitative'>
			<LineGraphComponent data={quantitativeData} />
		</div>
		)
}



const mapStateToProps= (rootReducer)=>{
	return({
		colName: rootReducer.inBuildData.qualitativeColName,
		qualitativeData: rootReducer.inBuildData.qualitativeData
	})
}



export default connect(mapStateToProps)(QualitativeComponent)