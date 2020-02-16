import React from 'react';
import './quantitativeComponent.scss';
import BarGraphComponent from '../../graphs/barGraphComponentViaChartjs/barGraphComponentViaChartjs';
import { connect} from 'react-redux';

const QuantitativeComponent = (props)=> {

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
		<div className='quantitative'>
			<BarGraphComponent data={dataArray}  />
		</div>
		)

}



const mapStateToProps= (rootReducer)=>{
	return({
		colName: rootReducer.inBuildData.quantitativeColName,
		quantitativeData: rootReducer.inBuildData.quantitativeData
	})
}



export default connect(mapStateToProps)(QuantitativeComponent)