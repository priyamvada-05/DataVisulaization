import React from 'react';
import './quantitativeComponent.scss';
import BarGraphComponent from '../../graphs/barGraphComponentViaChartjs/barGraphComponentViaChartjs';
import { connect} from 'react-redux';
import PieChartComponent from '../../graphs/pieChartComponentViaChartjs/pieChartComponent';

const QuantitativeComponent = (props)=> {

	if(props.loadingData && props.receivedQuantitativeDataFromRedux){


	const colName= props.colName;
	const quantitativeData= props.quantitativeData[colName];

	const dataArray=[];
	var uniqueDataName=[];

		if(quantitativeData){
	
		uniqueDataName= [...new Set(quantitativeData)]
		uniqueDataName.forEach((item)=>{
			var count=0;
			const dataObj={}
			if(item)
		{			
	quantitativeData.forEach((data)=>{
				const newItem= String(item)
				const newData= String(data)
				if(newData.includes(newItem)){
					return count=count+1
				}
			})

			dataObj['name']=String(item);
			dataObj['value']=count;
			dataArray.push(dataObj);
		}
		})
	}


	return(
		<div className='container'>
			
			{dataArray.length>0?
			(
			<div className='row'>
				<div className='col-md-6'>
				<div className='card'>
					<div className='card-body'>
					<h2>Bar Chart</h2>
					</div>

					<div className='card-body'>

					<BarGraphComponent data={dataArray} name={colName} />
					</div>
				</div>

				</div>

				<div className='col-md-6'>
				<div className='card'>
					<div className='card-body'>
					<h2>Pie Chart</h2>
					</div>

					<div className='card-body'>
					<PieChartComponent data={dataArray} name={colName} />
					</div>
				</div>

				</div>
			</div>
			)
			: <div className='col-md-6 offset-3'>
			<h1>Preparing your Chart</h1>
			</div>
		}

		</div>
		)

}
else{
	return null
}

}


const mapStateToProps= (rootReducer)=>{
	return({
		colName: rootReducer.inBuildData.quantitativeColName,
		quantitativeData: rootReducer.inBuildData.quantitativeData,
		loadingData: rootReducer.inBuildData.loadingQuantitativeData,
		receivedQuantitativeDataFromRedux:  rootReducer.inBuildData.receivedQuantitativeData
	})
}



export default connect(mapStateToProps)(QuantitativeComponent)